import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../entities/portfolio.entity';

@Injectable()
export class PortfoliosService {
    constructor(
        @InjectRepository(Portfolio)
        private readonly portfolioRepository: Repository<Portfolio>,
    ) { }

    async getLatest(limit: number = 6) {
        return this.portfolioRepository.find({
            where: { isVisible: true },
            order: { periodStart: 'DESC', createdAt: 'DESC' }, // Assuming periodStart or createdAt
            take: limit,
            select: ['id', 'title', 'clientName', 'imageUrl', 'category', 'description'],
        });
    }
}
