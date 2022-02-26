import { Document, Types, Schema, model } from "mongoose";

export interface IImageProperties {
    image: Types.ObjectId;
}

export interface ITextProperties {
    text: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    justifyContent: string;
    alignItems: string;
}

export interface IPanelProperties {
    backgroundColor: string;
    borderStyle: string;
    borderWidth: string;
    borderColor: string;
    borderRadius: string;
}

export enum LayerType {
    image,
    text,
    panel,
}

export interface ILayer {
    type: LayerType;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    xFlip: boolean;
    yFlip: boolean;
    properties: IImageProperties | ITextProperties | IPanelProperties;
}

export interface IComic extends Document {
    title: string;
    tags: string[];
    published: boolean;
    comicImageURL: string;
    author: Types.ObjectId;
    layers: ILayer[];
    createdAt: Date;
}

const comicSchema = new Schema<IComic>({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
        required: true,
    },
    comicImageURL: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    layers: {
        type: [Object],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comic = model<IComic>("Comic", comicSchema);
export default Comic;
