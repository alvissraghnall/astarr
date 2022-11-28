import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cart, CartDocument } from "./cart.schema";

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private readonly carttModel: Model<CartDocument>) {}


    
}
