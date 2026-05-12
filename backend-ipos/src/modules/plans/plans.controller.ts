import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) { }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Post('seed')
  seed() {
    return this.plansService.seed();
  }
}
