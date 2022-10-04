import express from "express";
import { isAuthenticated } from "../util/middlewares";
import User, { IUser } from "../models/user";
import Board, { IBoard } from "../models/ttt";

const router = express.Router();

router.post("/", isAuthenticated, async (req:any, res:any, next:any) => {
    res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
    const user = req.user;
    res.status(200).json({ status: "OK", human: user?.human, wopr: user?.wopr, tie: user?.tie  });
    return next()
});

export default router;
