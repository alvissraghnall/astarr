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
        const savedProd = await newProduct.save();

        // return this.mapProductToDTO((savedProd as ProductDocument), new ProductDTO());
        return savedProd;
    }

    async getProduct (id: ObjectId | string) {
        const prod = await this.productModel.findById(id);
        // return this.mapProductToDTO(<ProductDocument> prod, new ProductDTO());
        return prod;
    }

    async getProducts(sortOptions?: ProductSortOptions): Promise<ProductDTO[]> {
        const products = sortOptions.cat ? await this.productModel.find({
            categories: { $in: [sortOptions.cat] }
        })
            : (sortOptions.new ? await this.productModel.find().sort({ createdAt: -1 }).limit(1)
            : await this.productModel.find());
        
        // let inDTO: ProductDTO[] = [];
        // if (products) {
            // for (const product of products) {
            //     inDTO.push(this.mapProductToDTO(product, new ProductDTO()))
            // }
        // }
        return products;
    }

    async deleteProduct (id: ObjectId | string) {
        const prod = await this.productModel.findByIdAndDelete(id);
        // return this.mapProductToDTO(prod, new ProductDTO());
        return prod;
    }

    async updateProduct (id: ObjectId | string, values: Partial<ProductDTO>) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
           $set:  values
        }, { new: true, lean: true });
        // return this.mapProductToDTO(updatedProduct, new ProductDTO());
        return updatedProduct;
    }

    async replaceProduct (
        id: ObjectId | string,
        values: ProductDTO
    ) {
        return await this.productModel.findOneAndReplace({
            id: id
        }, values, { new: true, lean: true });

    }

    // mapProductToDTO (product: ProductDocument, dto: ProductDTO): ProductDTO {
    //     dto.category = product?.category;
    //     dto.createdAt = product?.createdAt;
    //     dto.updatedAt = product?.updatedAt;
    //     dto.image = product?.image;
    //     dto.title = product?.title;
    //     dto.desc = product?.desc;
    //     dto.image = product?.image;
    //     dto.sizes = product?.sizes;
    //     dto.colors = product?.colors;
    //     dto.price = product?.price;
    //     dto.inStock = product?.inStock;
    //     dto.rating = product.rating;
    //     dto.discountIsActive = product.discountIsActive;
    //     dto.discountPercentage = product.discountPercentage;
    //     dto.id = product?.id?.toString();
    //     // console.log(product, product?._id);
    //     return dto;
    // }

}
