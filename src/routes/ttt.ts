import express from "express";
import { isAuthenticated } from "../util/middlewares";

const router = express.Router();

router.post("/play", isAuthenticated, async (req:any, res:any, next:any) => {
    let { move } = req.body; 
    // else{
    //     console.log(req.session)
    // }

    // if (move < 0 || move > 9) {
    //     res.status(200).json({ status: "ERROR"});
    //     return next();
    // }

    // const user = await User.findOne({email: email});
    // if (!user) {
    //     res.status(400).json({ error: "User not found", status: "ERROR"});
    //     return next();
    // }

    // const payload = verifyToken(user, key);

    // if (!payload) {
    //     res.status(400).json({ error: "Token is invalid or expired", status: "ERROR"});
    //     return next();
    // }

    // await user.save();

    // res.status(200).json({ message: "OK", status: "OK"});
    // return next();
    //put X into human 
    //get games from user, last index is most recent game 
    //do everyt
    res.status(200).json({status: "OK"});
    return next()
});

export default router;
