import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ObjectId } from "mongoose";
import { Observable } from "rxjs";
import { UserDocument } from "src/user/user.schema";
import { Role as UserRole } from "../../user/user-role";

@Injectable()
export class VerifyUserIdGuard implements CanActivate {
    
    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // const role = this.reflector.get<UserRole>('role', context.getHandler());
        const user = request.user as UserDocument

        if ((user._id as ObjectId).toString() === request.params.id || user.role === UserRole.ADMIN) {
            return true;
        } else return false;
    }

}