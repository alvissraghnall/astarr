import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { OrderDTO } from './order.dto';
import { Order, OrderDocument } from "./order.schema";

@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

    async create (order: OrderDTO): Promise<OrderDTO> {
        const newOrder = new this.orderModel(order);

        const saved = await newOrder.save();
        console.log(saved);
        
        return this.mapOrderToDTO(saved, new OrderDTO());
    }

    async getAllOrdersByUser (userId: ObjectId | string): Promise<OrderDTO[]> {
        const userOrders = await this.orderModel.find({ userId });

        let inDTO: OrderDTO[] = [];
        if (userOrders) {
            for (const order of userOrders) {
                inDTO.push(this.mapOrderToDTO(order, new OrderDTO()))
            }
        }
        return inDTO;
    }

    async getById (id: string) {
        const order = await this.orderModel.findById(id);
        return this.mapOrderToDTO(order, new OrderDTO());
    }

    async getAll (): Promise<OrderDTO[]> {
        const orders = await this.orderModel.find();
        let inDTO: OrderDTO[] = [];
        if (orders) {
            for (const order of orders) {
                inDTO.push(this.mapOrderToDTO(order, new OrderDTO()))
            }
        }
        return inDTO;
    }

    async remove (id: ObjectId | string): Promise<OrderDTO> {
        return this.mapOrderToDTO(await this.orderModel.findByIdAndDelete(id), new OrderDTO());
    }

    async update (id: ObjectId | string, values: Partial<OrderDTO>): Promise<OrderDTO> {
        const updatedCart = await this.orderModel.findByIdAndUpdate(id, {
            $set:  values
         }, { new: true, lean: true });
         return this.mapOrderToDTO(updatedCart, new OrderDTO());
    }

    async getStats (previousMonth: Date) {
        const income = this.orderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ]);
        return income;
    }

    private mapOrderToDTO (order: Order, dto: OrderDTO): OrderDTO {
        dto.createdAt = order?.createdAt;
        dto.updatedAt = order?.updatedAt;
        dto.cartId = order?.cartId.toString();
        dto.address = order?.address;
        dto.amount = order?.amount;
        dto.status = order?.status;
        dto.userId = order?.userId;

        console.log(dto);
        return dto;
    }
    
}
