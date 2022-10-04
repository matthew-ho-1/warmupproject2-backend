import express from "express";
import { isAuthenticated } from "../util/middlewares";
import User, { IUser } from "../models/user";
import Board, { IBoard } from "../models/ttt";

const router = express.Router();

const playAI = (grid: any) => {
   let i = 0;
   let done = false;
   let empty = true;
   while(i < grid.length && !done){
      if(grid[i] !== "X" && grid[i] !== "O"){
         grid[i] = "O"
         done = true
      }
      i++
   }
   return grid
}

const checkWinner = (grid: any) => {
    //check all rows
    let winner = " "
    for(let i = 0; i < grid.length; i+=3){
      if(grid[i] === grid[i+1] && grid[i] === grid[i+2]){
        if(grid[i] !== " ")
          return grid[i]
      }
    }
    //check columns
    for(let i = 0; i < grid.length; i++){
      if(grid[i] === grid[i+3] && grid[i] === grid[i+6]){
        if(grid[i] !== " ")
          return grid[i]
      }
    }

    //check diagonal
    if(grid[0] == grid[4] && grid[0] == grid[8] && grid[0] !== " ")
      return grid[0]
    if(grid[2] == grid[4] && grid[2] == grid[6] && grid[2] !== " ")
      return grid[2]

    //check tie
    if(winner === ""){
      if(checkBoardFull(grid))
        winner = "T"
    }
    return winner
}

const checkBoardFull = (grid: any) => {
  let count = 0
  for(let i = 0; i < grid.length; i++){
     if(grid[i] === "X" || grid[i] === "O"){
        count++
     }
  }
  return count === grid.length
}

const makeNewGame = async (board: any, user: any, winner:any) => {
    board.completed = true;
    board.winner = winner;
    if(winner === 'X')
        user.human += 1
    else if(winner === 'O')
        user.wopr += 1
    else if(winner === 'T')
        user.tie += 1
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

router.post("/play", isAuthenticated, async (req:any, res:any, next:any) => {
    let { move } = req.body;
    res.set('X-CSE356', '6323b577ca6faf39d6056aa2');
    if (move < 0 || move > 8) {
        res.status(200).json({ status: "ERROR"});
        return next();
    }
   const user = req.user;
   const board = await Board.findById(user.games[user.games.length - 1])

    if(move == null){ //move is null
        res.status(200).json({ status: "OK", grid: board?.grid, winner: ' '});
        return next();
    }

   //put x onto board
   if(board){
       board.grid[move] = 'X'
   }

   let winner = checkWinner(board?.grid);
   if(winner === ' '){
       if(board){
           board.grid = playAI(board?.grid);
           winner = checkWinner(board?.grid);
           if(winner !== ' '){
              await makeNewGame(board, user, winner)
           }
       }
   }
   else{
       await makeNewGame(board, user, winner)
   }
   if(board){
       const newBoard = await Board.findByIdAndUpdate(board._id, board);
   }

    //get games from user, last index is most recent game 
    //do everyt
    res.status(200).json({ status: "OK", grid: board?.grid, winner: board?.winner});
    return next()
});

export default router;
