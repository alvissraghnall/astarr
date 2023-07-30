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

    @Prop({ required: true, unique: true })
    desc: string;

    @Prop({ required: true })
    image: string;

    @Prop()
    category: string;

    @Prop({ type: Array, default: [ProductSize.MEDIUM] })
    sizes: ProductSize[];

    @Prop({ required: true, type: Array })
    colors: string[];
    
    @Prop({ required: true })
    price: number;

    @Prop({ required: true, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: false, max: 100, min: 0 })
    discountPercentage?: number;

    @Prop({ required: true, default: false })
    discountIsActive: boolean;

    @Prop()
    inStock: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
