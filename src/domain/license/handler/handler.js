const config = require('../../../config/global');
const DatabaseMongodb = require('../../../infrastructure/databases/MongoDB');
const MongoRepositoryCommand = require('../repositories/commands/mongoRepository');
const MongoRepositoryQuery = require('../repositories/queries/mongoRepository');
const LicenseUseCaseCommand = require('../usecases/commands/licenseUseCase');
const LicenseUseCaseQuery = require('../usecases/queries/licenseUseCase');
const ResponseWrapper = require('../../../utils/wrapper');
const LicenseValidator = require('../../../validation/validator/LicenseValidator');

class LicenseHandler {
    constructor() {
        const databaseUrl = config.get('/database').mongodb.url;
        const database = new DatabaseMongodb(databaseUrl);

        // Set up repository instances
        const mongoRepositoryCommand = new MongoRepositoryCommand(database);
        const mongoRepositoryQuery = new MongoRepositoryQuery(database);

        // Assign use cases with respective repositories
        this.licenseUseCaseCommand = new LicenseUseCaseCommand(mongoRepositoryCommand, mongoRepositoryQuery);
        this.licenseUseCaseQuery = new LicenseUseCaseQuery(mongoRepositoryQuery);

        // Initialize utilities
        this.responseWrapper = new ResponseWrapper();
        this.validator = new LicenseValidator();
    }

    generateMasterKey = async (req, res) => {
        const { body: payload } = req;
        const { error } = this.validator.validateGenerateMasterKey(payload);

        if (error) {
            return this.responseWrapper.error(res, {}, error.details[0].message, 400);
        }

        try {
            const license = await this.licenseUseCaseCommand.generateMasterKey(payload);
            return this.responseWrapper.success(res, license, 'Master Key generated successfully', 200);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }

    generateLicense = async (req, res) => {
        const { body: payload } = req;
        const { error } = this.validator.validateGenerateLicense(payload);

        if (error) {
            return this.responseWrapper.error(res, {}, error.details[0].message, 400);
        }

        try {
            const license = await this.licenseUseCaseCommand.generateLicense(payload);
            return this.responseWrapper.success(res, license, 'License generated successfully', 200);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }

    verifyLicense = async (req, res) => {
        const { body: payload } = req;

        try {
            const license = await this.licenseUseCaseQuery.verifyLicense(payload);
            return this.responseWrapper.success(res, license, 'License verified successfully', 200);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }
}

module.exports = LicenseHandler;
