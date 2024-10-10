const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/global');

class AuthService {
    constructor() {
        this.secret = config.get('/jwt').secret;
    }

    generateToken = (user) => {
        return jwt.sign(user, config.get('/jwt').secret, {
            issuer: config.get('/jwt').issuer,
            algorithm: 'HS256',
            expiresIn: '24h'
        });
    }

    hash = (password) => {
        return bcrypt.hash(password, 10);
    }
    
    compare = (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = AuthService;