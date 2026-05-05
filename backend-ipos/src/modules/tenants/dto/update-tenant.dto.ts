import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantDto } from './create-tenant.dto';
import { IsOptional, IsIn } from 'class-validator';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @IsOptional()
  @IsIn(['Active', 'Terminated', 'Suspended', 'Trial'])
  status?: 'Active' | 'Terminated' | 'Suspended' | 'Trial';
}