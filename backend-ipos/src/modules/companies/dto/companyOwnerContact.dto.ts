import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class BusinessOwnerContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}
