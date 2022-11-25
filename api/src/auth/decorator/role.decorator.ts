import { Role as UserRole} from "../../user/user-role";
import { SetMetadata } from "@nestjs/common";

export const Role = (role: UserRole) => SetMetadata('role', role);