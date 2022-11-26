import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserDTO } from "src/user/user.dto";
import { Role as UserRole } from "../../user/user-role";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const role = this.reflector.get<UserRole>('role', context.getHandler());

        if (!role) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as UserDTO;

        console.log(role, user.role);
        return role === user.role;
    }
    
}