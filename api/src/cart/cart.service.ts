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

    async getCartForUser (userId: ObjectId | string): Promise<CartDTO> {
        return this.mapCartToDTO(await this.cartModel.findOne({ userId }), new CartDTO());
    }

    get (id: string): Promise<CartDTO>;
    get(id: string, internal: boolean): Promise<CartDocument>;

    async get (id: string, internal?: boolean): Promise<CartDocument | CartDTO> {
        const cart = await this.cartModel.findById(id).exec();
        if (internal) return cart;
        return this.mapCartToDTO(cart, new CartDTO());
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

    async update (cart: CartDocument, updatedCart: Partial<CartDTO>) {
        // cart.products = updatedCart.products;

        // return this.mapCartToDTO(await cart.save(), new CartDTO());
         
    }

    private mapCartToDTO (cart: CartDocument, dto: CartDTO): CartDTO {
        dto.createdAt = cart?.createdAt;
        dto.updatedAt = cart?.updatedAt;
        dto.userId = cart?.userId.toString();
        dto.products = cart?.products;
        dto.id = cart?._id.toString();

        console.log(dto);
        return dto;
    }
    
}
