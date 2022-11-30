import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CartObject } from '../cart/cart-object.schema';
import { Status } from './order-status';

export type OrderDocument = Order & Document;

@Schema({
    timestamps: true
})
export class Order {

    @Prop({
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    })
    cartId: Types.ObjectId;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    userId: User | Types.ObjectId;

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