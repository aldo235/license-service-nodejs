const express = require('express');
const AuthHandler = require('./handler');
const JwtAuth = require('../../../middleware/JWTAuth');
const BasicAuth = require('../../../middleware/BasicAuth');

const router = express.Router();
const authHandler = new AuthHandler();
const basicAuth = new BasicAuth();
const jwtAuth = new JwtAuth();

router.post('/v1/login', basicAuth.authenticate, authHandler.login);
router.post('/v1/register', basicAuth.authenticate, authHandler.register);
router.get('/v1/me', jwtAuth.authenticate, authHandler.me);

module.exports = router;