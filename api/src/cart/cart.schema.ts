import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CartObject } from './cart-object.schema';

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
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartObject" }] })
    products: CartObject[]

    createdAt: Date;

    updatedAt?: Date;

}

export const CartSchema = SchemaFactory.createForClass(Cart);