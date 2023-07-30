import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CartDTO } from './cart.dto';
import { Cart, CartDocument } from "./cart.schema";
import { ProductService } from '@/product/product.service';
import { Product } from '@/product/product.schema';
import { CartObjectDTO } from './cart-object.dto';
import { ProductDTO } from '@/product/product.dto';
import { User, UserDocument } from '@/user/user.schema';
import { CartObject } from './cart-object.schema';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
        private readonly productService: ProductService
    ) {}

    async create (cart: CartDTO): Promise<CartDTO> {
        const newCart = new this.cartModel(cart);

        const saved = await newCart.save();
        console.log(saved);
        
        return this.mapCartToDTO(saved, new CartDTO());
    }

    getCartForUser (userId: ObjectId | string): Promise<CartDTO>;
    getCartForUser (userId: ObjectId | string, internal: boolean): Promise<CartDocument>;


    async getCartForUser (userId: ObjectId | string, internal?: boolean): Promise<CartDTO | CartDocument> {
        const cart = await this.cartModel.findOne({ userId });
        if(internal) return cart;
        return this.mapCartToDTO(cart, new CartDTO());
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
                inDTO.push(await this.mapCartToDTO(cart, new CartDTO()))
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

    private async mapCartToDTO (cart: CartDocument, dto: CartDTO): Promise<CartDTO> {
        dto.createdAt = cart?.createdAt;
        dto.updatedAt = cart?.updatedAt;
        dto.userId = cart?.userId.toString();
        dto.products = cart?.products;
        dto.id = cart?._id.toString();
        dto.products = await this.includeProductRelation(cart.products)

        console.log(dto);
        return dto;
    }

    private async includeProductRelation (items: CartObjectDTO[]) {
        let product: ProductDTO;
        for (let item of items) {
          product = await this.productService.getProduct(item.productId);
          item.product = product;
        }
        return items;
    }

    async addItem (item: CartObjectDTO, user: UserDocument) {
        const cart = await this.getCartForUser(user.id, true);
        
        const existingItem = (await cart).products?.find(prod => prod.productId === item.productId);

        if (existingItem) {
            existingItem.quantity += item.quantity ?? 1;
        } else {
            const newItem: CartObject = {
                productId: item.productId, 
                quantity: item.quantity || 1
            };
            cart.products = [...(cart.products || []), newItem]; // Add the new item to the cart
        }

        const savedCart = await cart.save();
        
        return this.mapCartToDTO(savedCart, new CartDTO());;

    }

    async removeItem (
        itemId: string,
        user: UserDocument
    ) {
        const cart = await this.getCartForUser(user.id, true);

        if (!cart) {
            throw new NotFoundException(`Cart not found for user: ${user.id}`);
        }

        const itemIndex = cart.products?.findIndex((item) => item.productId === itemId);

        if (itemIndex < 0 || itemIndex === undefined) {
            throw new NotFoundException(`Product with ID: ${itemId} not on user cart`);
        }

        cart.products?.splice(itemIndex, 1);
        
        const savedCart = await cart.save();
        
        return this.mapCartToDTO(savedCart, new CartDTO());;
    }
    
}
