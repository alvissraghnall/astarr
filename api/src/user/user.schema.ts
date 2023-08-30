import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './user-role';
import { Document, Types } from 'mongoose';
import { Product } from '@product/product.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({
        required: true,
        unique: true
    })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    favourites: (Product | Types.ObjectId | string)[]; // Array of favorite product IDs

    @Prop({ required: true, default: Date.now() })
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);