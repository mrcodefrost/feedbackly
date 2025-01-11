import mongoose, { Schema, Document } from "mongoose";

export interface IOwner extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const OwnerSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

const Owner = mongoose.model<IOwner>("Owner", OwnerSchema);

export default Owner;