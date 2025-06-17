import {Document, model, Schema, Types} from "mongoose";

export interface IUser extends Document{
    id:Types.ObjectId;
    username:string;
    password:string;
    role:string;
    email:string;
    status:boolean;
    createDate: Date;
    deleteDate: Date; 
}
const UserSchema = new Schema<IUser>({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['admin', 'user'] 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    },
    createDate: { 
        type: Date, 
        default: Date.now 
    },
    deleteDate: { 
        type: Date 
    }
});
export const User=model<IUser>('User', UserSchema, 'user');
