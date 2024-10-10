const Joi = require('joi');
const LicenseSchemas = require('../schema/LicenseSchemas');

class LicenseValidator {
    validateGenerateMasterKey = (data) => {
        const schema = Joi.object(LicenseSchemas.LicenseMasterGenerateSchema);
        return schema.validate(data);
    }

    validateGenerateLicense = (data) => {
        const schema = Joi.object(LicenseSchemas.LicenseGenerateSchema);
        return schema.validate(data);
    }
}

module.exports = LicenseValidator;
