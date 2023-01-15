import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ProductSize } from './product-size';

export type ProductDocument = Product & Document<ObjectId, any, Product>;

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

    @Prop({ type: Array, default: [ProductSize.MEDIUM] })
    size: ProductSize[];

    @Prop({ required: true, type: Array })
    color: string[];
    
    @Prop({ required: true })
    price: number;

    @Prop()
    inStock: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
