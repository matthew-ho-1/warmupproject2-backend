import { Model, Document, Types, Schema, model } from "mongoose";

export interface IBoard extends Document {
    user: string;
    grid: string[];
    moves: number[];
    winner: string; 
    updatedAt: Date;
    createdAt: Date;
    publishedAt?: Date;
}

const boardSchema = new Schema<IBoard>(
    {
        user:{
            type: String,
        },
        grid: {
            type: [String],
        },
        moves: {
            type: [Number],
        },
        winner: {
            type: String,
        },
    },
    { timestamps: true }
);

const Board: Model<IBoard> = model<IBoard>("Board", boardSchema);
export default Board;
