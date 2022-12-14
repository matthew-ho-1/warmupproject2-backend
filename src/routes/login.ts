import express from "express";
import passport from "../util/passport-config";
import { isAuthenticated } from "../util/middlewares";
import User, { IUser } from "../models/user";
import Board, { IBoard } from "../models/ttt";

const router = express.Router();

router.post("/", async (req:any, res:any, next:any) => {
        //Pass request information to passport
        passport.authenticate("local", function (err:any, user:any, info:any) {
            res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
            if (err) {
                return res.status(200).json({ status: "ERROR" });
            }
            if (!user) {
                return res.status(200).json({ status: "ERROR" });
            }
            req.login(user, async function (err:any) {
                if (err) {
                    return res.status(200).json({ status: "ERROR" });
                }
                if(user.games.length === 0){
                    const newBoard = new Board({
                        user: user._id,
                        grid: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                        winner: ' ',
                        moves: [],
                        completed: false,
                    });

                    await newBoard.save();

                    user.games.push(newBoard._id);
                    await user.save();
                }
                return res.status(200).json({ status: "OK"});
            });
        })(req, res, next);
});

export default router;
