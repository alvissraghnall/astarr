import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CartObject } from '../cart/cart-object.schema';
import { Status } from './order-status';
import { Product } from 'src/product/product.schema';

export type OrderDocument = Order & Document;

@Schema({
    timestamps: true
})
export class Order {

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartObject" }] })
    products: CartObject[]

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    userId: Types.ObjectId;

    @Prop({ required: true })
    amount: number;
    
    @Prop({ required: true })
    address: string;

    @Prop({ required: true, default: Status.PENDING })
    status: Status;

    createdAt: Date;

    updatedAt?: Date;

}

export const OrderSchema = SchemaFactory.createForClass(Order);