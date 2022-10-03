import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user";
import mongoose from "mongoose";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "not logged in" });
};

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
    return next();
    // const user = req.user as IUser;
    // if (!user.verified)
    //     res.status(401).json({ error: "must be verified to perform requested action" });
    // else return next();
};
