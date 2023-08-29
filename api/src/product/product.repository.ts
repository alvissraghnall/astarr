import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { ProductDTO } from './product.dto';
import { ProductSortOptions } from './product.types';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(product: ProductDTO): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async getProductById(id: ObjectId | string): Promise<Product | null> {
    return this.productModel.findById(id).lean().exec();
  }

  async getProducts(sortOptions?: ProductSortOptions): Promise<Product[]> {
    const products = sortOptions.cat 
        ? await this.productModel.find({
            categories: { $in: [sortOptions.cat] }
        })
        : (sortOptions.new 
            ? await this.productModel.find().sort({ createdAt: -1 }).limit(1)
            : await this.productModel.find()
        );
    
    return products;
  }

  async deleteProduct(id: ObjectId | string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).lean().exec();
  }

  async updateProduct(
    id: ObjectId | string,
    values: Partial<ProductDTO>,
  ): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, { $set: values }, { new: true, lean: true }).exec();
  }

  async replaceProduct(
    id: ObjectId | string,
    values: Partial<ProductDTO>,
  ): Promise<Product | null> {
    return this.productModel.findOneAndReplace({ _id: id }, values, {
      new: true,
      lean: true,
    });
  }
}
