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

    async get (userId: ObjectId | string): Promise<CartDTO> {
        return this.mapCartToDTO(await this.cartModel.findOne({ userId }), new CartDTO());
    }

    async getAll (): Promise<CartDTO[]> {
        const carts = await this.cartModel.find();
        let inDTO: CartDTO[] = [];
        if (carts) {
            for (const cart of carts) {
                inDTO.push(this.mapCartToDTO(cart, new CartDTO()))
            }
        }
        return inDTO;
    }

    async remove (id: ObjectId | string): Promise<CartDTO> {
        return this.mapCartToDTO(await this.cartModel.findByIdAndDelete(id), new CartDTO());
    }

    async update (id: ObjectId | string, values: Partial<CartDTO>): Promise<CartDTO> {
        const updatedCart = await this.cartModel.findByIdAndUpdate(id, {
            $set:  values
         }, { new: true, lean: true });
         return this.mapCartToDTO(updatedCart, new CartDTO());
         
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
