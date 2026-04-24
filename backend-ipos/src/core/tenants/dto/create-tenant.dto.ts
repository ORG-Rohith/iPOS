import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  Length,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateTenantDto {
  // 🏢 Basic Info
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  legal_name?: string;

  @IsString()
  @IsOptional()
  @IsIn(['retail', 'fnb', 'both'])
  business_type?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  registration_number?: string;

  // 🌍 Location
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  country_code?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  // 📞 Contact
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  contact_name?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  // 📍 Address
  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  // 🏷 Branding
  @IsUrl()
  @IsOptional()
  logo_url?: string;

  // 💳 Subscription
  @IsString()
  @IsOptional()
  plan?: string;

  @IsOptional()
  @IsIn(['Monthly', 'Yearly'])
  billing_cycle?: 'Monthly' | 'Yearly';

  // ⚙️ Flexible
  @IsOptional()
  settings?: Record<string, any>;
}