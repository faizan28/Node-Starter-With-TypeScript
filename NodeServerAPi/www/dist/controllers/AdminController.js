"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Dashboard(req, res, next) {
    try {
        res.json({
            Message: "Welcome To DashBoard"
        });
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.Dashboard = Dashboard;
async function AddPost(req, res, next) {
    try {
        res.json({
            Message: "Post Created",
            Params: req.body
        });
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.AddPost = AddPost;
