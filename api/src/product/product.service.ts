import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductDTO } from './product.dto';
import { Product, ProductDocument } from './product.schema';
import { ProductSortOptions } from './product.types';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async createProduct (productDTO: ProductDTO): Promise<ProductDTO> {
        const newProduct = new this.productModel(productDTO);

        return await newProduct.save();
    }

    async getProduct (id: ObjectId | string) {
        return await this.productModel.findById(id);
    }

    async getProducts(sortOptions: ProductSortOptions): Promise<ProductDTO[]> {
        return sortOptions.new ? await this.productModel.find().sort({ createdAt: -1 }).limit(1)
            : sortOptions.cat ? (await this.productModel.find({
                categories: { $in: [sortOptions.cat] }
            }))
            : await this.productModel.find();
    }

    async deleteProduct (id: ObjectId | string) {
        return await this.productModel.findByIdAndDelete(id);
    }

    async updateProduct (id: ObjectId | string, values: Partial<ProductDTO>) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
           $set:  values
        }, { new: true, lean: true });
        return updatedProduct;
    }

}
