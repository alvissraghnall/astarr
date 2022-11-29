import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductSize } from './product-size';

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

    @Prop({ type: String, enum: ProductSize, default: ProductSize.MEDIUM })
    size: ProductSize;

    @Prop({ required: true })
    color: string;
    
    @Prop({ required: true })
    price: number;

    createdAt: Date;

    updatedAt: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
