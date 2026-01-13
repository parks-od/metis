import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('site_configs')
export class SiteConfig extends BaseEntity {
    @Column({ name: 'site_name', default: 'Metis Consulting' })
    siteName: string;

    @Column({ name: 'logo_url', nullable: true })
    logoUrl: string;

    @Column({ name: 'footer_info', nullable: true, type: 'text' })
    footerInfo: string;

    @Column({ name: 'meta_description', nullable: true })
    metaDescription: string;
}
