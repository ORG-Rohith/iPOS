import { Module } from '@nestjs/common';
import { OutletsService } from './outlets.service';
import { OutletsController } from './outlets.controller';
import { use } from 'passport';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  controllers: [OutletsController],
  providers: [OutletsService],
})
export class OutletsModule {}
