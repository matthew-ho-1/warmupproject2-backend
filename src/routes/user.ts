import express from "express";
import bcrypt from "bcrypt";
import passport, { isAuthenticated } from "../util/passport-config";
import User, { IUser } from "../models/user";

const router = express.Router();

// ROUTE TO CHECK IF LOGGED IN
router.get("/", isAuthenticated, (req, res, next) => {
    const user = req.user as IUser;
    res.status(200).json({ user });
    return next();
});

// GET USER
router.get("/:id", async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400).json({ error: "No user found" });
        return next();
    }
    res.status(200).json(user);
    return next();
});

// LOGIN
router.post("/login", (req, res, next) => {
    // Pass request information to passport
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(401).json({ errors: err });
        }
        if (!user) {
            return res.status(401).json({ errors: "No user found" });
        }
        req.login(user, function (err) {
            if (err) {
                return res.status(401).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
});

// LOGOUT
router.post("/logout", (req, res, next) => {
    req.logout();
    res.json({ msg: "Logged Out!" });
    return next();
});

// REGISTER
router.post("/register", async (req, res, next) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).json({ msg: "Missing arguments in request" });
        return next();
    }

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
        res.status(400).json({ msg: "Account with that email address and/or username already exists." });
        return next();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        username,
        password: hashedPassword,
    });

    await user.save();
    
    // Automatically Login User
    req.login(user, (err) => {
        if (err) {
            res.status(200).json({ msg: "Registered Successfully, Unable to Login." });
        } else {
            res.status(200).json({ msg: "Registered Successfully!" });
        }   
    });
    return next();
});

// UPDATE USER - AUTH
router.put("/", isAuthenticated, async (req, res, next) => {
    const oldUser = req.user as IUser;
    const newUser = req.body.user as IUser;

    if (!newUser) {
        res.status(400).json({ error: "Missing arguments" });
        return next();
    }

    if (newUser._id !== oldUser._id) {
        res.status(401).json({ error: "User ID's do not match." });
        return next();
    }

    const user = await oldUser.update(newUser);

    res.status(200).json(user);
    return next();
});


export default router;
