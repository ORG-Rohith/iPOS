import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { DeviceLoginDto } from "./dto/device-login.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entity/users.entity";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../auth/auth.service";
import { OutletsService } from "../outlets/outlets.service";
import { JwtService } from "@nestjs/jwt";
import { TenantsService } from "../tenants/tenants.service";
import { Device } from "./entity/device.entity";
import { DeviceLoginResponseDto, DeviceRegistrationPayloadDto } from "./dto/device-login-response.dto";
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
            user_uuid: user.uuid,
            user_full_name: user.name,
            role: roles.map((role) => ({
                role_name: role.roleName,
            })),
            outlets: tenant.outlets.map((outlet) => ({
                uuid: outlet.uuid,
                store_name: outlet.name,
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
            where: { device_number: body.devices.device_number }
        });
        if (existingDevice) {
            throw new BadRequestException("Device already exists");
        }

        const user = await this.userRepo.findOne({ where: { uuid: body.user_uuid } });
        const tenant = await this.tenantService.findByTenantId(user.tenant_id);
        if (!user) {
            throw new BadRequestException("User not found");
        }

        const activationCode = await this.generateUniqueDeviceNumber();

        const device = this.deviceRepo.create({
            outlet_uuid: body.outlet_uuid,
            device_number: body.devices.device_number,
            os: body.devices.os,
            tenant_uuid: tenant.uuid,
            device_pair: false,
            is_active: true,
            activation_code: activationCode
        });
        const deviceData = await this.deviceRepo.save(device);

        const result: DeviceRegistrationPayloadDto = {
            device_uuid: deviceData.uuid,
            activation_code: activationCode.toString()
        }

        return { status: "success", result };
    }
    async deviceValidation(body: DeviceValidationDto) {
        const device = await this.deviceRepo.findOne({
            where: { uuid: body.device_uuid }
        });
        if (!device) {
            throw new BadRequestException("Device not found");
        }
        if (device.activation_code.toString() !== body.access_code) {
            throw new BadRequestException("Invalid activation code");
        }

        if (device.device_pair === true) {
            throw new BadRequestException("Device already paired");
        }
        this.deviceRepo.update(device.id, { device_pair: true });
        return { status: "success", message: "Device paired successfully" };
    }

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



}