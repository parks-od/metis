import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultant, ConsultantStatus } from '../entities/consultant.entity';

@Injectable()
export class ConsultantsService {
    constructor(
        @InjectRepository(Consultant)
        private readonly consultantRepository: Repository<Consultant>,
    ) { }

    async findAll(page: number = 1, limit: number = 12, department?: string) {
        const query = this.consultantRepository.createQueryBuilder('consultant');

        query.where('consultant.status = :status', { status: ConsultantStatus.ACTIVE });

        if (department) {
            query.andWhere('consultant.department = :department', { department });
        }

        query.skip((page - 1) * limit).take(limit);
        query.orderBy('consultant.createdAt', 'ASC'); // Or name, position

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async findOneBySlug(slug: string) {
        const consultant = await this.consultantRepository.findOne({
            where: { slug },
            relations: ['socialLinks', 'portfolios'],
            order: {
                socialLinks: { sortOrder: 'ASC' },
            },
        });

        if (!consultant) {
            throw new NotFoundException(`Consultant with slug '${slug}' not found`);
        }

        return consultant;
    }
}
