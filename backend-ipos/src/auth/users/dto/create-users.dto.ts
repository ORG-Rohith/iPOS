import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  //   @IsUUID()
  //   @IsOptional() // usually generated in backend
  //   uuid?: string;

  @IsOptional()
  tenant_id?: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
