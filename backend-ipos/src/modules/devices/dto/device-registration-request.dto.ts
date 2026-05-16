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
    device_number: string;

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
    user_uuid: string;

    @IsString()
    @IsNotEmpty()
    outlet_uuid: string;

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
    access_code: string;
}