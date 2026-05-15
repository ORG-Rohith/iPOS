import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { DeviceLoginDto } from "./dto/device-login.dto";
import { DevicesService } from "./device.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { RequestUser } from "../users/types/jwt-payload.type";
import { DevicePairDto } from "./dto/device-pair.dto";

@Controller("device")
export class DevicesController {
    constructor(private readonly deviceService: DevicesService) { }


    // @Post("login")
    // async deviceLogin(@Body() dto: DeviceLoginDto) {
    //     console.log("this is the dto", dto);
    //     return this.deviceService.deviceLogin(dto);
    // }

    // @Get("/outlets/getall")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Tenant Admin', 'Outlet Manager')
    // async getAllOutlets(@CurrentUser() user: RequestUser) {
    //     return this.deviceService.getAllOutlets(user);
    // }

    // @Get("/generateDeviceId")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Tenant Admin', 'Outlet Manager')
    // async generateDeviceId(@Body() user: RequestUser) {
    //     console.log("this is the user", user.outletId);
    //     return this.deviceService.generateDeviceId(user);
    // }

    // @Post("/devicePair")
    // @UseGuards(JwtAuthGuard)
    // async devicePair(@Body() dto: DevicePairDto) {
    //     return this.deviceService.devicePair(dto);
    // }

}