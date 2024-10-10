require('dotenv').config();
const confidence = require('confidence');

const config = {
    basic: {
        username: process.env.BASIC_AUTH_USERNAME,
        password: process.env.BASIC_AUTH_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER
    },
    license_secret: process.env.LICENSE_SECRET,
    database: {
        mongodb: {
            url: process.env.MONGODB_URL
        }
    }
}

const store = new confidence.Store(config);
const get = (key) => store.get(key);
module.exports = {
    get
};