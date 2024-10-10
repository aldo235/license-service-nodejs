const config = require('../config/global');
const JwtAuth = require('./JWTAuth');
const jwtAuth = new JwtAuth();

class BasicAuth {
    /**
     * Authenticate a request using basic auth
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    authenticate = (req, res, next) => {
        const basicUser = config.get('/basic');
        const authheader = req.headers.authorization;
        if(!authheader){
            res.status(401).send('No authorization header');
            return;
        }
        const isBasic = authheader.startsWith('Basic ');
        if(!isBasic){
            return jwtAuth.authenticate(req, res, next);
        }
        const base64Credentials = authheader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        if(username === basicUser.username && password === basicUser.password){
            return next();
        }
        return res.status(401).send('Invalid credentials');
    }
}
module.exports = BasicAuth;