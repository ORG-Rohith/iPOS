import { IsString } from "class-validator";

export class DeviceLoginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}