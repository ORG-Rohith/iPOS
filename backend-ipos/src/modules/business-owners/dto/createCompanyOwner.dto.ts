import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { SubscriptionDto } from "../../licences/dto/licence.dto";
import { BusinessOwnerContactDto } from "src/modules/companies/dto/companyOwnerContact.dto";

export class CreateBusinessOwnerDto {

  // ================================
  // BUSINESS INFO
  // ================================

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  legal_name?: string;

  @IsOptional()
  @IsEnum(['retail', 'fnb', 'both'])
  business_type?: 'retail' | 'fnb' | 'both';

  @IsOptional()
  @IsString()
  tax_id?: string;

  @IsOptional()
  @IsString()
  registration_number?: string;

  // ================================
  // LOCATION
  // ================================

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  country_code?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  // ================================
  // CONTACT
  // ================================

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  contact_name?: string;

  @IsOptional()
  @IsString()
  website?: string;

  // ================================
  // ADDRESS
  // ================================

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  // ================================
  // BRANDING
  // ================================

  @IsOptional()
  @IsString()
  logo_url?: string;

  // ================================
  // STATUS
  // ================================

  @IsOptional()
  @IsEnum(['Active', 'Inactive', 'Suspended'])
  status?: 'Active' | 'Inactive' | 'Suspended';

  @IsOptional()
  @IsBoolean()
  onboarding_complete?: boolean;

  // ================================
  // SUBSCRIPTIONS
  // ================================

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubscriptionDto)
  subscriptions?: SubscriptionDto[];

  // ================================
  // OWNERS / CONTACTS
  // ================================

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessOwnerContactDto)
  owners?: BusinessOwnerContactDto[];
}