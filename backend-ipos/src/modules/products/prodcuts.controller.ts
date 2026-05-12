// src/sync/sync.controller.ts

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { productsService } from './products.service';

@Controller('sync')
export class productsController {
    constructor(private readonly productsService: productsService) {

    }
    @Post()
    @HttpCode(HttpStatus.OK)
    syncData(@Body() syncDto: any) {

        return this.productsService.syncData(syncDto)
    }
}