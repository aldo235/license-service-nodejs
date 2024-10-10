const config = require('../../../config/global');
const DatabaseMongodb = require('../../../infrastructure/databases/MongoDB');
const MongoCommandUser = require('../../user/repositories/commands/mongodbRepository');
const MongoQueriesUser = require('../../user/repositories/queries/mongodbRepository');
const CommandUseCase = require('../usecases/commands/authUseCase');
const QueryUseCase = require('../usecases/queries/authUseCase');
const ResponseWrapper = require('../../../utils/wrapper');
const AuthValidator = require('../../../validation/validator/AuthValidator');

class AuthHandler {
    constructor() {
        const databaseUrl = config.get('/database').mongodb.url;
        const database = new DatabaseMongodb(databaseUrl);

        // Initialize query and command use cases with their respective repositories
        const userRepositoryQuery = new MongoQueriesUser(database);
        this.authUseCaseQuery = new QueryUseCase(userRepositoryQuery);

        const userRepositoryCommand = new MongoCommandUser(database);
        this.authUseCaseCommand = new CommandUseCase(userRepositoryCommand, userRepositoryQuery);

        // Initialize utilities
        this.responseWrapper = new ResponseWrapper();
        this.validator = new AuthValidator();
    }

    login = async (req, res) => {
        const { body: payload } = req;
        const { error } = this.validator.validateLoginUser(payload);

        if (error) {
            return this.responseWrapper.error(res, {}, error.details[0].message, 400);
        }

        try {
            const user = await this.authUseCaseQuery.login(payload);
            return this.responseWrapper.success(res, user, 'Login successful', 200);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }

    register = async (req, res) => {
        const { body: payload } = req;
        const { error } = this.validator.validateRegisterUser(payload);

        if (error) {
            return this.responseWrapper.error(res, {}, error.details[0].message, 400);
        }

        try {
            const user = await this.authUseCaseCommand.register(payload);
            return this.responseWrapper.success(res, user, 'Registration successful', 201);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }

    me = async (req, res) => {
        const { id: userId } = req.user;

        try {
            const user = await this.authUseCaseQuery.me(userId);
            return this.responseWrapper.success(res, user, 'User data retrieved successfully', 200);
        } catch (err) {
            return this.responseWrapper.error(res, {}, err.message, 500);
        }
    }
}

module.exports = AuthHandler;
