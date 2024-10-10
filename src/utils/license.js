const Crypto = require('crypto');

class LicenseGenerator {
    constructor(secretKey) {
        this._secretKey = secretKey;
    }

    // Generates a master key (random 32-character hex string)
    generateMaster = () => Crypto.randomBytes(16).toString('hex');

    // Generates the license key by combining machineId, masterKey, and timestamp
    generateLicense = (machineId, masterKey, timestamp) => {
        const combinedInput = `${machineId}${masterKey}${timestamp}`;  // Combine input data
        let hash = Crypto.createHmac('sha256', this._secretKey)
            .update(combinedInput)
            .digest();

        // Perform additional iterations for added security
        for (let i = 0; i < 100; i++) {
            hash = Crypto.createHmac('sha256', this._secretKey).update(hash).digest();
        }

        return hash.toString('hex');  // Return the license key as a hex string
    }

    // Verifies if the license is valid by comparing to the expected license
    verifyLicense = (machineId, masterKey, timestamp, licenseKey) => {
        const expectedLicense = this.generateLicense(machineId, masterKey, timestamp);
        return expectedLicense === licenseKey;  // Compare generated license with provided one
    }
}

module.exports = LicenseGenerator;
