import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('pages')
export class Page extends BaseEntity {
    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ name: 'is_published', default: true })
    isPublished: boolean;
}
