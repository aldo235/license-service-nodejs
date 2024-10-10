const express = require('express');
const LicenseHandler = require('./handler');
const JwtAuth = require('../../../middleware/JWTAuth');

const router = express.Router();
const licenseHandler = new LicenseHandler();
const jwtAuth = new JwtAuth();

router.post('/v1/generate', jwtAuth.authenticate, licenseHandler.generateLicense);
router.post('/v1/master', jwtAuth.authenticate, licenseHandler.generateMasterKey);
router.post('/v1/verify', jwtAuth.authenticate, licenseHandler.verifyLicense);

module.exports = router;