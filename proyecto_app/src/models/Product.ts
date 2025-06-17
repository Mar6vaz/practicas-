import { Document, model, Schema, Types } from "mongoose";

export interface Product extends Document {
    id: Types.ObjectId;
    name: string;
    description: string;
    qty: number;
    status: boolean;
    price: number;
    createDate: Date;
    deleteDate: Date;
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }
});

export const product = model<Product>('Product', productSchema, 'product');