import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, Request, NextFunction } from 'express';
dotenv.config();
export class JsonWebToken {
    public SecretKey = process.env.JWTSECRETKEY;
    signToken(Payload) {
        return jwt.sign({
            iss: 'CodeWorker',
            sub: Payload,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, this.SecretKey)
    }


    public jwtSign(req, res) {
        let payLoad = {
            id: 245
        }
        const token = this.signToken(payLoad);
        res.json({
            token
        });
        // jwt.sign({ Payload: payLoad }, this.SecretKey, (err, token) => {
        //     res.json({
        //         token
        //     });
        // })
    }
    public verifyToken(req, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403)
        }
    }

}