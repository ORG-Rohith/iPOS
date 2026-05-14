import {
    IsNumber,
    IsOptional,
    IsEnum,
    IsDateString,
    IsBoolean,
} from "class-validator";

export class SubscriptionDto {
    @IsNumber()
    plan_id: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    custom_max_tenants?: number;

    @IsOptional()
    @IsNumber()
    custom_max_outlets?: number;

    @IsOptional()
    @IsNumber()
    custom_max_users?: number;

    @IsOptional()
    @IsNumber()
    custom_max_devices?: number;

    @IsOptional()
    @IsEnum(["active", "trial", "expired", "cancelled"])
    status?: "active" | "trial" | "expired" | "cancelled";

    @IsOptional()
    @IsDateString()
    start_date?: string;

    @IsOptional()
    @IsDateString()
    end_date?: string;

    @IsOptional()
    @IsBoolean()
    auto_renew?: boolean;
}