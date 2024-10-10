const moment = require('moment');
const config = require('../../../../config/global');
const LicenseGenerator = require('../../../../utils/license');

class LicenseUseCase {
    constructor(licenseRepository, licenseRepositoryQuery) {
        this.licenseRepository = licenseRepository;
        this.licenseRepositoryQuery = licenseRepositoryQuery;
        this.licenseGenerator = new LicenseGenerator(config.get('/license_secret'));
    }

    async generateMasterKey(payload) {
        const expiredAt = moment().add(payload.lifetime || 1, 'M').toISOString();
        const masterKey = this.licenseGenerator.generateMaster();
        
        const data = {
            masterKey,
            name: payload.name,
            description: payload.description,
            expiredAt,
            licenseKey: [],
            maxKey: payload.maxKey,
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
        };
        
        await this.licenseRepository.save(data);

        // Generate licenses if devices are provided
        return payload.device && payload.device.length > 0
            ? await this.generateLicense({ masterKey, device: payload.device })
            : data;
    }

    async generateLicense(payload) {
        const { masterKey, device } = payload;
        const license = await this.licenseRepositoryQuery.findByMasterKey(masterKey);
        
        if (!license) {
            throw new Error('Master key not found');
        }

        const availableQuota = license.maxKey - license.licenseKey.length;
        if (availableQuota < device.length) {
            throw new Error('Insufficient device quota');
        }

        const newKeys = device.slice(0, availableQuota).reduce((keys, { device_id, lifetime, maxDevice, description }) => {
            const existingKey = license.licenseKey.find(item => item.device === device_id);
            if (existingKey) return keys;

            const expirationDate = moment.min(moment(license.expiredAt), moment().add(lifetime, 'M')).toISOString();
            const licenseKey = this.licenseGenerator.generateLicense(device_id, masterKey, expirationDate);

            keys.push({
                licenseKey,
                device_id,
                expiredAt: expirationDate,
                maxDevice,
                description,
            });
            return keys;
        }, []);

        license.licenseKey.push(...newKeys);
        await this.licenseRepository.save(license);

        return {
            masterKey,
            licenseKeys: license.licenseKey.map(({ licenseKey, expiredAt }) => ({ licenseKey, expiredAt })),
            expiredAt: license.expiredAt,
            maxKey: license.maxKey,
        };
    }
}

module.exports = LicenseUseCase;
