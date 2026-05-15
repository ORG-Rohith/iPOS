import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DeviceLoginDto } from "./dto/device-login.dto";
import { DevicesService } from "./device.service";
import { DeviceRegistrationRequestDto, DeviceValidationDto } from "./dto/device-registration-request.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("/pos-device/registration")
export class DeviceRegistrationController {

    constructor(private readonly deviceService: DevicesService) { }

    @Post("login")
    async deviceRegistrationLogin(@Body() body: DeviceLoginDto) {
        return this.deviceService.deviceRegistrationLogin(body);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async deviceRegistration(@Body() body: DeviceRegistrationRequestDto) {
        return this.deviceService.deviceRegistration(body);
    }
    @Post("validation")
    @UseGuards(JwtAuthGuard)
    async deviceValidation(@Body() body: DeviceValidationDto) {
        return this.deviceService.deviceValidation(body);
    }

}