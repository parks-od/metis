import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SocialLink } from './socialLink.entity';
import { Inquiry } from './inquiry.entity';
import { Portfolio } from './portfolio.entity';

export enum ConsultantStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    LEAVE = 'LEAVE',
}

@Entity('consultants')
export class Consultant extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    position: string; // 직책

    @Column({ nullable: true })
    department: string; // 부서

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ name: 'profile_image', nullable: true })
    profileImage: string;

    @Column({ name: 'introduction', nullable: true })
    introduction: string;

    @Column({ type: 'enum', enum: ConsultantStatus, default: ConsultantStatus.ACTIVE })
    status: ConsultantStatus;

    @OneToMany(() => SocialLink, (socialLink) => socialLink.consultant, { cascade: true })
    socialLinks: SocialLink[];

    @OneToMany(() => Inquiry, (inquiry) => inquiry.consultant)
    inquiries: Inquiry[];

    @ManyToMany(() => Portfolio, (portfolio) => portfolio.consultants)
    @JoinTable({
        name: 'consultant_portfolios',
        joinColumn: { name: 'consultant_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'portfolio_id', referencedColumnName: 'id' },
    })
    portfolios: Portfolio[];
}
