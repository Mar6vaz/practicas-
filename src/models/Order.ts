import { Document, model, Schema, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  idUser: Types.ObjectId;
  total: number;
  subtotal: number;
  status: string;
  createDate: Date;
  updateDate: Date;
  products: IOrderProduct[];
}

const orderProductsSchema = new Schema<IOrderProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { id: false });

const orderSchema = new Schema<IOrder>({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  products: {
    type: [orderProductsSchema],
    required: true,
    validate: [(array: any[]) => array.length > 0, 'Debe contener al menos un producto']
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  updateDate: {
    type: Date
  }
});

export const order = model<IOrder>('Order', orderSchema, 'order');
