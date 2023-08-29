import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ProductRepository } from './product.repository';
import { ProductDTO } from './product.dto';
import { ProductSortOptions } from './product.types';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(productDTO: ProductDTO): Promise<ProductDTO> {
    const newProduct = await this.productRepository.createProduct(productDTO);
    return newProduct as ProductDTO;
  }

  async getProduct(id: ObjectId | string) {
    return this.productRepository.getProductById(id);
  }

  async getProducts(sortOptions?: ProductSortOptions): Promise<ProductDTO[]> {
    return this.productRepository.getProducts(sortOptions);
  }

  async deleteProduct(id: ObjectId | string) {
    return this.productRepository.deleteProduct(id);
  }

  async updateProduct(id: ObjectId | string, values: Partial<ProductDTO>) {
    return this.productRepository.updateProduct(id, values);
  }

  async replaceProduct(id: ObjectId | string, values: ProductDTO) {
    return this.productRepository.replaceProduct(id, values);
  }
}
