import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessOwnerDto } from './createCompanyOwner.dto';

export class UpdateBusinessOwnerDto extends PartialType(CreateBusinessOwnerDto) { }
