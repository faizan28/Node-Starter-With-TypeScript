"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
class JsonWebToken {
    constructor() {
        this.SecretKey = process.env.JWTSECRETKEY || '';
    }
    signToken(Payload) {
        return jwt.sign({
            iss: 'CodeWorker',
            sub: Payload,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, this.SecretKey);
    }
    jwtSign(req, res) {
        let payLoad = {
            id: 245
        };
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
    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}
exports.JsonWebToken = JsonWebToken;
