import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { Consultant } from '../entities/consultant.entity';
import { SocialLink } from '../entities/socialLink.entity';
import { Portfolio } from '../entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultant, SocialLink, Portfolio])],
  controllers: [ConsultantsController],
  providers: [ConsultantsService],
})
export class ConsultantsModule { }
