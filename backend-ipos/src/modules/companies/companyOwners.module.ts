import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessOwnersService } from './companyOwners.service';
import { BusinessOwnersController } from './companyOwners.controller';
import { BusinessOwner } from './entity/companyOwner.entity';
import { BusinessOwnerContact } from './entity/companyOwnerContact.entity';
import { Subscription } from '../licences/entity/licence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessOwner, BusinessOwnerContact, Subscription])],
  controllers: [BusinessOwnersController],
  providers: [BusinessOwnersService],
  exports: [BusinessOwnersService],
})
export class BusinessOwnersModule { }
