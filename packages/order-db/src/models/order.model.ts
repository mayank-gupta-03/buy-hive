import mongoose from "mongoose";
import { OrderStatus } from "../types/orderSchema.type";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: OrderStatus },
    products: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderSchemaType = mongoose.InferSchemaType<typeof OrderSchema>;

export const Order = mongoose.model<OrderSchemaType>("Order", OrderSchema);
