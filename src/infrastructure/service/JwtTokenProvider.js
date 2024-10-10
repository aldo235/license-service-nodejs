const jwt = require('jsonwebtoken');
const config = require('../../config/global');

class JwtTokenProvider {
  constructor(secret) {
    this.secret = secret;
  }

  generateToken(user) {
    return jwt.sign(user, config.get('/jwt').secret, {
        issuer: config.get('/jwt').issuer,
        algorithm: 'HS256',
        expiresIn: '24h'
    });
  }
}

module.exports = JwtTokenProvider;
