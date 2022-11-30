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

        return this.mapProductToDTO((savedProd as Product), new ProductDTO());
    }

    async getProduct (id: ObjectId | string) {
        const prod = await this.productModel.findById(id);
        return this.mapProductToDTO(<Product> prod, new ProductDTO());
    }

    async getProducts(sortOptions: ProductSortOptions): Promise<ProductDTO[]> {
        const products = sortOptions.cat ? await this.productModel.find({
            categories: { $in: [sortOptions.cat] }
        })
            : (sortOptions.new ? await this.productModel.find().sort({ createdAt: -1 }).limit(1)
            : await this.productModel.find());
        
        let inDTO: ProductDTO[] = [];
        if (products) {
            for (const product of products) {
                inDTO.push(this.mapProductToDTO(product, new ProductDTO()))
            }
        }
        return inDTO;
    }

    async deleteProduct (id: ObjectId | string) {
        const prod = await this.productModel.findByIdAndDelete(id);
        return this.mapProductToDTO(prod, new ProductDTO());
    }

    async updateProduct (id: ObjectId | string, values: Partial<ProductDTO>) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
           $set:  values
        }, { new: true, lean: true });
        return this.mapProductToDTO(updatedProduct, new ProductDTO());
    }

    private mapProductToDTO (product: Product, dto: ProductDTO): ProductDTO {
        dto.categories = product?.categories;
        dto.createdAt = product?.createdAt;
        dto.updatedAt = product?.updatedAt;
        dto.image = product?.image;
        dto.title = product?.title;
        dto.desc = product?.desc;
        dto.image = product?.image;
        dto.size = product?.size;
        dto.color = product?.color;
        dto.price = product?.price;
        return dto;
    }

}
