import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CartDTO } from './cart.dto';
import { Cart, CartDocument } from "./cart.schema";
import { ProductService } from '@/product/product.service';
import { Product, ProductDocument } from '@/product/product.schema';
import { CartObjectDTO, CartObjectRequestDTO } from './cart-object.dto';
import { ProductDTO } from '@/product/product.dto';
import { User, UserDocument } from '@/user/user.schema';
import { CartObject, CartObjectDocument } from './cart-object.schema';
import { isProduct } from '@product/guard/is-product-type.guard';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
        private readonly productService: ProductService
    ) {}

    async create (cart: CartDTO) {
        const newCart = new this.cartModel(cart);

        const saved = await newCart.save();
        console.log(saved);
        
        // return this.mapCartToDTO(saved, new CartDTO());
        return saved;
    }

    // getCartForUser (userId: ObjectId | string): Promise<CartDTO>;
    // getCartForUser (userId: ObjectId | string, internal: boolean): Promise<CartDocument>;


    async getCartForUser (userId: ObjectId | string, internal?: boolean): Promise<CartDocument> {
        const cart = await this.cartModel.findOne({ userId });
        if (!internal) return cart.populate({
            path: "products",
            model: "Product",
            populate: {
                path: "product",
                model: "Product",
            }
        });
        console.log(cart);
        return cart;
        // return this.mapCartToDTO(cart, new CartDTO());
    }

    get (id: string): Promise<CartDTO>;
    get(id: string, internal: boolean): Promise<CartDocument>;

    async get (id: string, internal?: boolean): Promise<CartDocument | CartDTO> {
        console.log(id);
        const cart = await this.cartModel.findById(id).populate("products").exec();
        return cart;
    }

    async getAll () {
        const carts = await this.cartModel.find().populate({
            path: "products",
            model: "Product",
            populate: {
                path: "product",
                model: "Product",
            }
        }).exec();
        // let inDTO: CartDTO[] = [];
        // if (carts) {
        //     for (const cart of carts) {
        //         inDTO.push(await this.mapCartToDTO(cart, new CartDTO()))
        //     }
        // }
        return carts;
    }

    async remove (userId: ObjectId | string): Promise<CartDTO> {
        return await this.cartModel.findOneAndRemove({
            userId
        });
    }

    async update (cart: CartDocument, updatedCart: Partial<CartDTO>) {
        // cart.products = updatedCart.products;

        // return this.mapCartToDTO(await cart.save(), new CartDTO());
         
    }

    async addItem (item: CartObjectRequestDTO, user: UserDocument) {
        const cart = await this.getCartForUser(user.id, true);
        // console.log(cart.products);
        const existingItemIndex = cart.products?.findIndex((prod) => {
            // console.log(prod, prod.product, item.productId, typeof prod.product);
            if (isProduct(prod.product)) {
                return (prod.product as ProductDocument)._id.toString() === item.productId;
            }
            return prod?.product?.toString() === item.productId;
        });
        console.log(existingItemIndex);
        if (existingItemIndex !== -1) {
            cart.products[existingItemIndex].quantity += item.quantity || 1;          
        } else {
            const newItem: CartObject = {
                product: item.productId, 
                quantity: item.quantity || 1
            };
            console.log(newItem);
            
            cart.products.push(newItem);
            // console.log(cart.products);
        }

        const savedCart = await cart.save();
        
        // return this.mapCartToDTO(savedCart, new CartDTO());;
        return cart.populate({
            path: "products",
            model: "Product",
            populate: {
                path: "product",
                model: "Product",
            }
        });

    }

    async removeItem (
        itemId: string,
        user: UserDocument,
        quantityToRemove: number = 1,        
    ) {
        const cart = await this.getCartForUser(user.id, true);

        if (!cart) {
            throw new NotFoundException(`Cart not found for user: ${user.id}`);
        }

        const itemIndex = cart.products?.findIndex((prod) => {
            
            if (isProduct(prod.product)) {
                return (prod.product as ProductDocument)._id.toString() === itemId;
            }
            return prod?.product?.toString() === itemId;
        });

        if (itemIndex < 0 || itemIndex === undefined) {
            throw new NotFoundException(`Product with ID: ${itemId} not on user cart`);
        }
        
        if (cart.products[itemIndex].quantity <= quantityToRemove) {
            cart.products.splice(itemIndex, 1); // Remove the item if its quantity is less than or equal to the quantity to remove
        } else {
            cart.products[itemIndex].quantity -= quantityToRemove; // Reduce the quantity
        }

        const savedCart = (await cart.save()).populate({
            path: "products",
            populate: {
                path: "product",
                model: "Product"
            }
        });
        
        // return this.mapCartToDTO(savedCart, new CartDTO());;
        return await savedCart;
    }
    
}
