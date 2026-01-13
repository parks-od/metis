import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';

@Controller('consultants')
export class ConsultantsController {
    constructor(private readonly consultantsService: ConsultantsService) { }

    @Get()
    findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('department') department: string,
    ) {
        return this.consultantsService.findAll(Number(page) || 1, Number(limit) || 12, department);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.consultantsService.findOneBySlug(slug);
    }
}
