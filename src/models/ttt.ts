import { Model, Document, Types, Schema, model } from "mongoose";

export interface IBoard extends Document {
    user: string;
    grid: string[];
    winner: string; 
    updatedAt: Date;
    createdAt: Date;
    completed: boolean;
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
        completed:{
            type: Boolean,
        },
        winner: {
            type: String,
        },
    },
    { timestamps: true }
);

const Board: Model<IBoard> = model<IBoard>("Board", boardSchema);
export default Board;
