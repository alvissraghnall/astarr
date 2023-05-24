import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        
        console.log("user from deco: ", ctx.switchToHttp().getRequest().user);

        return ctx.switchToHttp().getRequest().user
    }
)