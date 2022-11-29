import { Controller, Get, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { Role } from "src/auth/decorator/role.decorator";
import { RoleGuard } from "src/auth/guard/role.guard";
import { Role as UserRole } from "./user-role";
import { UserService } from "./user.service";

@Controller("user-stats")
export class UserStatsController {

    constructor(private readonly userService: UserService) {}

    
    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getUserStats () {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        
        return this.userService.getUserStats(lastYear);
    }
}