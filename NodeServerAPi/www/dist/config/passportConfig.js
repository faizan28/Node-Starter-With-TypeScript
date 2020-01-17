"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportJwt = require("passport-jwt");
// var { ExtractJwt } = require('passport-jwt');
// const passport = require('passport');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
// const JwtStrategy = passportLocal.JwtStrategy;
// const ExtractJwt = passportLocal.ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();
const SecretKey = process.env.JWTSECRETKEY;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SecretKey
}, async (payload, done) => {
    console.log('Passport Payload=>', payload);
    try {
        console.log('Passport Payload=>', payload);
        if (!payload) {
            return done(null, false);
        }
        done(null, payload);
    }
    catch (error) {
        console.log('Passport error=>', error);
        done(error, false);
    }
}));
