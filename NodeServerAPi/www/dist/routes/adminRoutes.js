"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const passport = require("passport");
const passportConf = require('../config/passportConfig');
let router = express_1.Router();
exports.router = router;
router.get('/', AdminController_1.Dashboard);
router.get('/dashboard', AdminController_1.Dashboard);
router.post('/addPost', passport.authenticate('jwt', { session: false }), AdminController_1.AddPost);