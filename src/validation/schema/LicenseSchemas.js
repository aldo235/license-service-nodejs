const Joi = require('joi');

const LicenseMasterGenerateSchema = {
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().optional().allow(""),
    maxKey: Joi.number().required(),
    device: Joi.array().items(Joi.object({
        device_id: Joi.string().required(),
        description: Joi.string().optional().allow(""),
        lifetime: Joi.number().required(),
        maxDevice: Joi.number().required(),
    })).optional(),
};

const LicenseGenerateSchema = {
    masterKey: Joi.string().min(3).required(),
    device: Joi.array().items(Joi.object({
        device_id: Joi.string().required(),
        description: Joi.string().optional().allow(""),
        lifetime: Joi.number().required(),
        maxDevice: Joi.number().required(),
    })).optional(),
};

module.exports = {
    LicenseMasterGenerateSchema,
    LicenseGenerateSchema
};