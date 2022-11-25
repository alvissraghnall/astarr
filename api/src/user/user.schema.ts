import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './user-role';

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

    @Prop({ required: true, default: Date.now() })
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);