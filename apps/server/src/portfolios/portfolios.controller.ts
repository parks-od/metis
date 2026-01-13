import { Controller, Get, Query } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
    constructor(private readonly portfoliosService: PortfoliosService) { }

    @Get('latest')
    getLatest(@Query('limit') limit: number) {
        return this.portfoliosService.getLatest(limit || 4);
    }
}
