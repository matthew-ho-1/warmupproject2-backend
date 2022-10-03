import { Model, Document, Types, Schema, model } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    games: Types.ObjectId[];
    human: number;
    wopr: number;
    tie: number;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        games: {
            type: [{type: Schema.Types.ObjectId, ref: "Board"}]
        },
        human: {
            type: Number,
        },
        wopr: {
            type: Number,
        },
        tie: {
            type: Number,
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;
