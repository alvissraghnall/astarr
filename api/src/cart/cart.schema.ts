import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CartObject, ICartObject } from './cart-object.schema';

export type CartDocument = Cart & Document;

@Schema({
    timestamps: true
})
export class Cart {

    @Prop({
        required: true, 
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    userId: User;
    
    @Prop([
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
          quantity: { type: Number, required: true, min: 1, default: 1 },
        },
    ])
    products: CartObject[]

    createdAt: Date;

    updatedAt?: Date;

}

export const CartSchema = SchemaFactory.createForClass(Cart);