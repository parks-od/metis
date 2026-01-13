import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

// Entities
import { Admin } from './entities/admin.entity';
import { SiteConfig } from './entities/siteConfig.entity';
import { Menu } from './entities/menu.entity';
import { Page } from './entities/page.entity';
import { Consultant } from './entities/consultant.entity';
import { SocialLink } from './entities/socialLink.entity';
import { Portfolio } from './entities/portfolio.entity';
import { Inquiry } from './entities/inquiry.entity';
import { BoardConfig } from './entities/boardConfig.entity';
import { Post } from './entities/post.entity';
import { Attachment } from './entities/attachment.entity';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { ConsultantsModule } from './consultants/consultants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Vercel injects env vars automatically in prod
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      // Vercel Postgres requires SSL. 'rejectUnauthorized: false' needed often.
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
      entities: [
        Admin, SiteConfig, Menu, Page, Consultant, SocialLink,
        Portfolio, Inquiry, BoardConfig, Post, Attachment
      ],
      synchronize: true, // Only for dev/MVP. Use migrations in real prod.
      autoLoadEntities: true,
    }),
    PortfoliosModule,
    ConsultantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
