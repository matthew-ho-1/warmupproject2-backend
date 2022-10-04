import express from "express";
import { isAuthenticated } from "../util/middlewares";
import User, { IUser } from "../models/user";
import Board, { IBoard } from "../models/ttt";

const router = express.Router();

router.post("/", isAuthenticated, async (req:any, res:any, next:any) => {
    res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
    const user = req.user;
    let games:any = [];
    for(let i = 0; i < user.games.length; i++){
        const board = await Board.findById(user?.games[i])
        games.unshift({
            id: board?._id, 
            start_date: board?.createdAt
        })
    }
    res.status(200).json({ status: "OK", games: games});
    return next()
});

export default router;
