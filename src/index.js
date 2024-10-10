const express = require('express');
const helmet = require('helmet');
require('dotenv').config()
const licenseRoute = require('./domain/license/handler/routes');
const authRoute = require('./domain/auth/handler/routes');

class AppServer {
    constructor() {
        this.server = express();
        this.server.use(express.json({limit: '200mb'}));
        this.server.use(helmet());
        this.server.use(express.urlencoded({ extended: true, limit: '200mb' }));
        this.server.use('/license', licenseRoute);
        this.server.use('/auth', authRoute);
    }

    async init() {
        const port = process.env.PORT || 8080;
        this.server.listen(port, async () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

module.exports = AppServer;