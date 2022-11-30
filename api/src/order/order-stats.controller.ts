import { Controller, Get, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { Role } from "src/auth/decorator/role.decorator";
import { RoleGuard } from "src/auth/guard/role.guard";
import { Role as UserRole } from "../user/user-role";
import { OrderService } from "./order.service";

@Controller("order-stats")
export class OrderStatsController {

    constructor(private readonly orderService: OrderService) {}

    
    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getUserStats () {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        
        return this.orderService.getStats(previousMonth);
    }
}