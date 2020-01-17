import { Router } from "express";
import { Dashboard,AddPost } from "../controllers/AdminController";
import * as passport from "passport";
const passportConf = require('../config/passportConfig')
let router = Router();
router.get('/', Dashboard);
router.get('/dashboard', Dashboard);
router.post('/addPost',passport.authenticate('jwt', { session: false }),AddPost)
export {router};