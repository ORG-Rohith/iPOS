import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  display_name?: string;

  @IsNumber()
  @IsOptional()
  tenant_id?: number; // null = system role

  @IsBoolean()
  @IsOptional()
  is_system?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  permission_ids?: number[]; // assign permissions on create
}
