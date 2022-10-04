import express from "express";
import { isAuthenticated } from "../util/middlewares";
import User, { IUser } from "../models/user";
import Board, { IBoard } from "../models/ttt";

const router = express.Router();

router.post("/", isAuthenticated, async (req:any, res:any, next:any) => {
    res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
    let { id } = req.body;
    const board = await Board.findById(id)
    if(!board){
        res.status(200).json({ status: "ERROR" });
        return next()
    }
    res.status(200).json({ status: "OK", grid: board?.grid, winner: board?.winner});
    return next()
});

export default router;
