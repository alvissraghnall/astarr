import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from "./product.schema";
import { User } from "../user/user.schema";

@Schema({
    timestamps: true
})
export class ProductReview {

    @Prop({
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    author: User;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    })
    productId: Product;

    @Prop({
        required: true,
        default: 1
    })
    rating: 1 | 2 | 3 | 4  | 5;

    @Prop({
        required: true,
    })
    text: string;
}