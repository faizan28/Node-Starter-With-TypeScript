"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
let router = express_1.Router();
exports.router = router;
router.get('/', UsersController_1.SignIn);
router.post('/RegisterNewUser', UsersController_1.RegisterNewUser);
router.get('/LoadChannels', UsersController_1.GetChannelsByUserId);
router.get('/LoadMessage', UsersController_1.LoadMessageByChannel);
