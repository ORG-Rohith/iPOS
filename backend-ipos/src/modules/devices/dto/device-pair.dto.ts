import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DevicePairDto {
    @IsString()
    deviceId: string;
    @IsString()
    deviceName: string;
    @IsString()
    deviceType: string;
    @IsString()
    deviceModel: string;

    @IsNumber()
    outletId: number;
}