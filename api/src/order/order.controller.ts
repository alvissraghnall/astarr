import { Body, Delete, Controller, HttpCode, HttpStatus, Param, Put, UseGuards, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { ProductDTO } from 'src/product/product.dto';
import { Role as UserRole } from "../user/user-role";
import { OrderDTO } from './order.dto';
import { OrderService } from './order.service';
import type { Request } from "express";

@Controller('order')
export class OrderController {
    
    constructor(private readonly orderService: OrderService) {}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async createOrder (@Req() req: Request, @Body() orderDTO: OrderDTO) {
        return await this.orderService.create(orderDTO);
    }

    @Put('/:id')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async updateOrder (@Param("id") id: string, @Body() productDTO: Partial<ProductDTO> ) {
        return await this.orderService.update(id, productDTO);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async deleteOrder (@Param("id") id: string): Promise<{ message: string }> {
        await this.orderService.remove(id);
        return {
            message: "Order successfully removed!"
        }
    }

    @Get(":id")
    @UseGuards(VerifyUserIdGuard)
    @HttpCode(HttpStatus.OK)
    async getOrder (@Param("id") id: string | ObjectId) {
        const userOrders = await this.orderService.get(id);
        return userOrders;
    }

    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getOrders () {
        return await this.orderService.getAll();
    }

}
