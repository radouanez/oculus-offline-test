import { Application, NextFunction, Request, Response } from "express"
import { HTTP401Error } from "./http-errors"
import JWT from 'jwt-decode'
const REQUEST_TIMEOUT = 20000

// Check Authorization
const checkAuth = (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setTimeout(REQUEST_TIMEOUT, () => {
            res.status(408).send({
                message: 'Request timeout'
            });
        });

        // bypass auth for docs api and ping
        if (req.path === '/' || req.path === '/ping' || req.path.startsWith('/api/v1/api-docs')) {
            next();
            return;
        }

        // Check token passed and not expired
        if (!req.headers['authorization']) {
            throw new HTTP401Error('Invalid token');
        }
        //check access token expiration
        let expired = false;
        let token: any;
        try {
            token = JWT(req.headers['authorization'])
            if (!token || !token['exp']) {
                throw new Error('Bad token format, not exp claim');
            }
            expired = new Date().getTime() / 1000 > (token['exp']);
        } catch (e) {
            throw new HTTP401Error('Invalid token');
        }
        // token expired
        if (expired) {
            console.log('token expired');
            throw new HTTP401Error('token expired');
        }
        // check userId
        const userId = token['sub'];
        if (!userId) {
            throw new HTTP401Error('Missing claim sub');
        }
        next()
    });
}

export default checkAuth;