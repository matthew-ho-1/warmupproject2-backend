import express from "express";
import User, { IUser } from "../models/user";
import { isAuthenticated } from "../util/middlewares";

const router = express.Router();

// LOGOUT
router.post("/", (req:any, res:any, next:any) => {
    res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
    req.logout(function(err:any) {
        if (err) { return next(err); }
    });
    res.status(200).json({ status: "OK"});
    return next();
});

export default router;