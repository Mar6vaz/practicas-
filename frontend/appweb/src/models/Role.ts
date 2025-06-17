import { Document, model, Schema, Types } from "mongoose";

export interface Role extends Document {
    id: Types.ObjectId;
    name: string;
    type: string;
    status: boolean;
}

const roleSchema = new Schema<Role>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const role = model<Role>('Role', roleSchema, 'role');