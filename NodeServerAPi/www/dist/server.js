"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./Socket/socket");
const express = require("express");
const dotenv = require("dotenv");
const appjwt_1 = require("./config/appjwt");
const usersRoutes_1 = require("./routes/usersRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const ChatSocketcon = new socket_1.ChatSocket;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let _JsonWebToken = new appjwt_1.JsonWebToken();
let mongoUrl = 'mongodb://localhost/ChatEfficiency';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, ((err) => {
    if (err) {
        console.log('Mongo Error=>', err);
    }
    else {
        console.log('Mongo Connected');
    }
}));
app.use('/users', usersRoutes_1.router);
app.use('/admin', _JsonWebToken.verifyToken, adminRoutes_1.router);
app.get('/', (req, res) => {
    res.json({
        message: 'The sedulous hyena ate the antelope!'
    });
});
let server = app.listen(process.env.PORT || 8080, function () {
    server.setTimeout(300000);
    console.log("App now running on port", server.address());
});
ChatSocketcon.init(server);
