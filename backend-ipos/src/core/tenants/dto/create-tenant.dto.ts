import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  Length,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  @IsIn(['retail', 'fnb', 'both'])
  business_type?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;
}
