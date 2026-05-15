import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsObject,
    IsString,
    ValidateNested,
} from "class-validator";

export class DeviceDetails {

    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    os: string;
}

export class DeviceRegistrationRequestDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    outletId: string;

    @IsObject()
    @ValidateNested()
    @Type(() => DeviceDetails)
    devices: DeviceDetails;
}
export class DeviceValidationDto {
    @IsString()
    @IsNotEmpty()
    device_uuid: string;

    @IsString()
    @IsNotEmpty()
    accessCode: string;
}