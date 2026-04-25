import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEmail, IsJSON, IsObject } from 'class-validator';

export class CreateOutletDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address_line1: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsObject()
  @IsOptional()
  operating_hours?: any;

  @IsString()
  @IsOptional()
  tax_rule?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  receipt_header?: string;

  @IsString()
  @IsOptional()
  receipt_footer?: string;

  @IsNumber()
  @IsOptional()
  number_of_registers?: number;

  @IsString()
  @IsOptional()
  manager_id?: string;

  @IsString()
  @IsNotEmpty()
  tenant_id: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
