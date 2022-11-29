import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CartDTO } from './cart.dto';
import { Cart, CartDocument } from "./cart.schema";

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>) {}

    async create (cart: CartDTO): Promise<CartDTO> {
        const newCart = new this.cartModel(cart);

        const saved = await newCart.save();
        console.log(saved);
        
        return this.mapCartToDTO(saved, new CartDTO());
    }

    async get (id: ObjectId | string): Promise<CartDTO> {
        return this.mapCartToDTO(await this.cartModel.findById(id), new CartDTO());
    }

    async remove (id: ObjectId | string): Promise<CartDTO> {
        return this.mapCartToDTO(await this.cartModel.findByIdAndDelete(id), new CartDTO());
    }

    private mapCartToDTO (cart: Cart, dto: CartDTO): CartDTO {
        dto.createdAt = cart?.createdAt;
        dto.updatedAt = cart?.updatedAt;
        dto.userId = cart?.userId.toString();
        dto.products = cart?.products;

        console.log(dto);
        return dto;
    }
    
}
