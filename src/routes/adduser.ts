import express from "express";
import bcrypt from "bcrypt";
import passport from "../util/passport-config";
import { isAuthenticated } from "../util/middlewares";
import { sendVerifyEmail } from "../util/email-config";
import { verifyToken } from "../util/token-config";
import User, { IUser } from "../models/user";
import mongoose from "mongoose";

const router = express.Router();

// REGISTER
router.post("/", async (req, res, next) => {
   let { email, username, password } = req.body; 
        res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
        if (!email || !username || !password) {
            res.status(200).json({ status: "ERROR"});
            return next();
        }

        email = (email as string).toLowerCase();

        const existingUser = await User.findOne({
            $or: [
                {
                    email: email,
                },
                {
                    username: username,
                },
            ],
        });

        if (existingUser) {
            res.status(200).json({
                error: "Account with that email address and/or username already exists.", status: "ERROR"
            });
            return next();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            username,
            password: hashedPassword,
        });
        await user.save();
        await sendVerifyEmail(user);
        res.status(200).json({ message: "Registered Successfully!", status: "OK" })
        return next();
});

export default router;
