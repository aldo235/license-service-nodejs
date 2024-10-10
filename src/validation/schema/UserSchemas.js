const Joi = require('joi');

const UserSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

const UserLoginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

const UserRegisterSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

module.exports = {
    UserSchema,
    UserLoginSchema,
    UserRegisterSchema,
};