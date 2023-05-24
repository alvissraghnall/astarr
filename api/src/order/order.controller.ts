import { Body, Delete, Controller, HttpCode, HttpStatus, Param, Put, UseGuards, Get, NotFoundException, Post, Req, ForbiddenException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { ProductDTO } from 'src/product/product.dto';
import { Role as UserRole } from "../user/user-role";
import { OrderDTO } from './order.dto';
import { OrderService } from './order.service';
import type { Request } from "express";
import { UserDocument } from 'src/user/user.schema';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('order')
export class OrderController {
    
    constructor(private readonly orderService: OrderService) {}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async createOrder (@Req() req: Request, @Body() orderDTO: OrderDTO) {
        return await this.orderService.create(orderDTO);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async updateOrder (@Param("id") id: string, @Body() productDTO: Partial<ProductDTO>, @CurrentUser() user: UserDocument) {
        const order = await this.orderService.getById(id);
        if (user.role !== 'admin' && order.userId !== user.id) {
            throw new ForbiddenException('You are not authorized to update this order');
        }
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return await this.orderService.update(id, productDTO);
    }

    @Delete('/:id')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async deleteOrder (@Param("id") id: string): Promise<{ message: string }> {
        await this.orderService.remove(id);
        return {
            message: "Order successfully removed!"
        }
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getOrder (@Param("id") id: string, @CurrentUser() user: UserDocument) {
        const order = await this.orderService.getById(id);
        if (user.role !== 'admin' && order.userId !== user.id) {
            throw new ForbiddenException('You are not authorized to get this order!');
        }
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    @Get("/user/:userId")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getOrdersForUserByAdmin (@Param("userId") userId: string) {
        const orders = await this.orderService.getAllOrdersByUser(userId);
        return orders;
    } 

    @Get("/user")
    @HttpCode(HttpStatus.OK)
    async getOrdersForUser(@CurrentUser() user: UserDocument) {
        const orders = await this.orderService.getAllOrdersByUser(user.id ?? user._id.toString());
        
        if (!orders) {
            throw new NotFoundException('Orders not found');
        }
        return orders;
    }

    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getOrders () {
        return await this.orderService.getAll();
    }

}
