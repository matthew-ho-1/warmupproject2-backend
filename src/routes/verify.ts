import express from "express";
import { verifyToken } from "../util/token-config";
import User, { IUser } from "../models/user";
import { isAuthenticated } from "../util/middlewares";

const router = express.Router();

// VERIFY EMAIL
router.get("/", async (req:any, res:any, next:any) => {
    const { email, key } = req.query;
        
    if (!email || !key) {
        res.status(200).json({ status: "ERROR"});
        return next();
    }

    const user = await User.findOne({email: email});

    if (!user) {
        res.status(200).json({ status: "ERROR"});
        return next();
    }
    const payload = verifyToken(user, key);

    if (!payload) {
        res.status(200).json({ status: "ERROR"});
        return next();
    }

    res.status(200).json({ status: "OK"});

    return next();
});

export default router;
