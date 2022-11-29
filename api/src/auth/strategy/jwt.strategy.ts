import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService, Payload } from "../auth.service";
import { JwtKeyService } from "../jwt-keys";
import * as fs from "fs";
import * as path from "path";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtKeyService: JwtKeyService,
        private readonly authService: AuthService
        ) {
        // console.log(fs.readFileSync(path.join(process.cwd(), "./jwtRS256.key")).toString())
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: configService.get<string>('jwtSecret'),
            secretOrKey: fs.readFileSync(path.join(process.cwd(), "./jwtRS256.key")),
            algorithms: ["RS256"]
        })
    }

    async validate(payload: Payload) {
        console.log(payload);
        const user = await this.authService.validateUserPayload(payload);
        if (!user) throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);

        return user;

    }
}