import { Module } from "@nestjs/common";
import { DevicesService } from "./device.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entity/users.entity";
import { DevicesController } from "./devices.controller";
import { AuthModule } from "../auth/auth.module";
import { OutletsModule } from "../outlets/outlets.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TenantsModule } from "../tenants/tenants.module";
import { Device } from "./entity/device.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Device]), AuthModule, OutletsModule, TenantsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // ✅ Clean JWT config using process.env directly
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [],
        useFactory: () => ({
            secret: process.env.JWT_SECRET!,
            signOptions: {
                expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
            },
        }),
    }),],
    controllers: [DevicesController],
    providers: [DevicesService],
    exports: [DevicesService],
})
export class DevicesModule { }