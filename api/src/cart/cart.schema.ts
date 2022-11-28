import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CartObject } from './cart-object.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {

    @Prop({
        required: true, 
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    userId: User;
    
    @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartObject" }] })
    products: CartObject[]

    @Prop({ required: true, default: new Date() })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

}

export const CartSchema = SchemaFactory.createForClass(Cart);