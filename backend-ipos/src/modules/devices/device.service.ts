import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { DeviceLoginDto } from "./dto/device-login.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entity/users.entity";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../auth/auth.service";
import { OutletsService } from "../outlets/outlets.service";
import { JwtPayload, RequestUser } from "../users/types/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import { TenantsService } from "../tenants/tenants.service";
import { Device } from "./entity/device.entity";
import { DevicePairDto } from "./dto/device-pair.dto";
import { DeviceLoginResponseDto } from "./dto/device-login-response.dto";
import { DeviceRegistrationRequestDto, DeviceValidationDto } from "./dto/device-registration-request.dto";



@Injectable()
export class DevicesService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Device)
        private readonly deviceRepo: Repository<Device>,
        private readonly jwtService: JwtService,

        private readonly authService: AuthService,
        private readonly outletService: OutletsService,
        private readonly tenantService: TenantsService,


    ) { }

    async deviceRegistrationLogin(dto: DeviceLoginDto) {

        const { email, password } = dto;
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const [roles, permissions] = await Promise.all([
            this.authService.getUserRoles(user.id),
            this.authService.getUserPermissions(user.id),
        ]);

        const isTenantAdmin = roles.some((role) => role.roleName === "Tenant Admin");
        const isOutletManager = roles.some((role) => role.roleName === "Outlet Manager");
        console.log(" this is the role of the user =========>", roles);
        if (!isTenantAdmin && !isOutletManager) {
            throw new UnauthorizedException("You are not authorized to login as a device");
        }
        const tenant = await this.tenantService.findByTenantId(user.tenant_id);

        if (isTenantAdmin) {
            if (tenant.status !== "Active") {
                throw new BadRequestException("Tenant is not active");
            }
        }

        if (isOutletManager) {
            const outlet = await this.outletService.findOne(user.outlet_id.toString());
            if (outlet.is_active === true) {
                throw new BadRequestException("Outlet is not active");
            }
        }


        const payload: DeviceLoginResponseDto = {
            user_id: user.id.toString(),
            userName: user.name,
            role: roles.map((role) => ({
                roleName: role.roleName,
            })),
            outlets: tenant.outlets.map((outlet) => ({
                uuid: outlet.uuid,
                storeName: outlet.name,
            })),
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            tokenType: 'Bearer',
            payload
        };
    }


    async deviceRegistration(body: DeviceRegistrationRequestDto) {
        const existingDevice = await this.deviceRepo.findOne({
            where: { device_id: body.devices.deviceId }
        });
        if (existingDevice) {
            throw new BadRequestException("Device already exists");
        }

        const user = await this.userRepo.findOne({ where: { id: parseInt(body.userId) } });
        if (!user) {
            throw new BadRequestException("User not found");
        }

        const activationCode = await this.generateUniqueDeviceNumber();

        const device = this.deviceRepo.create({
            outlet_id: body.outletId,
            device_id: body.devices.deviceId,
            os: body.devices.os,
            tenant_id: user.tenant_id,
            device_pair: false,
            is_active: true,
            activation_code: activationCode
        });

        return await this.deviceRepo.save(device);
    }
    async deviceValidation(body: DeviceValidationDto) {
        const device = await this.deviceRepo.findOne({
            where: { uuid: body.device_uuid }
        });
        if (!device) {
            throw new BadRequestException("Device not found");
        }
        if (device.activation_code.toString() !== body.accessCode) {
            throw new BadRequestException("Invalid activation code");
        }

        if (device.device_pair === true) {
            throw new BadRequestException("Device already paired");
        }
        this.deviceRepo.update(device.id, { device_pair: true });
        return { status: "success", message: "Device paired successfully" };
    }
    // async getAllOutlets(user: RequestUser) {

    //     if (user.roles.some((role) => role.roleName === "Tenant Admin") || user.roles.some((role) => role.roleName === "Outlet Manager")) {
    //         return this.outletService.findOutletByTenantId(user.tenantId.toString());
    //     }
    //     throw new UnauthorizedException("You are not authorized to get all outlets");
    // }

    // async generateDeviceId(user: RequestUser) {
    //     console.log("user id from ", user);
    //     if (!user.outletId) {
    //         throw new BadRequestException(
    //             "Outlet is required to generate device ID",
    //         );
    //     }

    //     const deviceNumber =
    //         await this.generateUniqueDeviceNumber();
    //     const device = await this.deviceRepo.save({
    //         device_id: deviceNumber,
    //         outlet_id: user.outletId,
    //         tenant_id: user.tenantId,
    //         is_active: true,
    //     });
    //     return device;
    // }
    private async generateUniqueDeviceNumber(): Promise<number> {
        let exists = true;
        let activationCode;

        while (exists) {
            activationCode = this.generateDeviceNumber();

            const device = await this.deviceRepo.findOne({
                where: { activation_code: activationCode },
            });

            exists = !!device;
        }

        return activationCode;
    }

    generateDeviceNumber(): number {
        return Math.floor(
            10000000 + Math.random() * 90000000,
        );
    }


    // async devicePair(dto: DevicePairDto) {
    //     const { deviceId, outletId } = dto;
    //     const device = await this.deviceRepo.findOne({
    //         where: {
    //             device_id: deviceId,
    //             outlet_id: outletId
    //         },
    //     });
    //     if (!device) {
    //         throw new BadRequestException("Device not found");
    //     }

    //     if (device.device_pair === true) {
    //         throw new BadRequestException("Device is already paired");
    //     }
    //     device.device_pair = true;
    //     await this.deviceRepo.save(device);
    //     return device;
    // }

}