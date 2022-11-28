import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true
})
export class Product {

    @Prop({
        required: true,
        unique: true
    })
    title: string;

    @Prop({ required: true })
    desc: string;

    @Prop({ required: true })
    image: string;

    @Prop()
    categories: string[];

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    color: string;
    
    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
