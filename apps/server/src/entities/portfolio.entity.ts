import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Consultant } from './consultant.entity';

@Entity('portfolios')
export class Portfolio extends BaseEntity {
    @Column()
    title: string;

    @Column({ name: 'client_name', nullable: true })
    clientName: string;

    @Column({ name: 'image_url', nullable: true })
    imageUrl: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'period_start', nullable: true, type: 'date' })
    periodStart: Date;

    @Column({ name: 'period_end', nullable: true, type: 'date' })
    periodEnd: Date;

    @Column({ nullable: true })
    category: string;

    @Column({ name: 'is_visible', default: true })
    isVisible: boolean;

    @ManyToMany(() => Consultant, (consultant) => consultant.portfolios)
    consultants: Consultant[];
}
