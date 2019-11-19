import { Request,Response,NextFunction } from "express";

export async function Dashboard(req, res, next) {
    try {
        res.json({
           Message: "Welcome To DashBoard"
        });
    } catch (err) {
        console.log('err', err);
        next(err);
    }
}
export async function AddPost(req:Request, res:Response, next:NextFunction) {
    try {
        res.json({
           Message: "Post Created",
           Params:req.body
        });
    } catch (err) {
        console.log('err', err);
        next(err);
    }
}