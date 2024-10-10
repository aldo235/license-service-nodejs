
const moment = require('moment');
const config = require('../../../../config/global');
const LicenseGenerator = require('../../../../utils/license');

class LicenseUseCase {
    constructor(licenseRepository) {
        this.licenseRepository = licenseRepository;
        this.licenseGenerator = new LicenseGenerator(config.get('/license_secret'));
    }

    async verifyLicense(payload) {
        const {masterKey, licenseKey} = payload;
        let license = await this.licenseRepository.findByMasterKey(masterKey);
        if(!license) {
            throw new Error('Master key not found');
        }
        let licenseKeyValid = license.licenseKey.find(item => item.licenseKey === licenseKey);
        if(!licenseKeyValid) {
            throw new Error('License key not found');
        }
        if(moment().isAfter(licenseKeyValid.expiredAt)) {
            throw new Error('License key is expired');
        }
        let isValid = this.licenseGenerator.verifyLicense(licenseKeyValid.device_id, masterKey, licenseKeyValid.expiredAt, licenseKey);
        return {isValid};
    }
}

module.exports = LicenseUseCase;
