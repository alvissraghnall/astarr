import { IsNotEmpty } from "class-validator";

export class UserLoginPayload {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

}