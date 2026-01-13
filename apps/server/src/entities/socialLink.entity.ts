import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Consultant } from './consultant.entity';

export enum SocialPlatform {
    KAKAO = 'KAKAO',
    BLOG = 'BLOG',
    INSTAGRAM = 'INSTAGRAM',
    WEB = 'WEB',
    LINKEDIN = 'LINKEDIN',
    YOUTUBE = 'YOUTUBE',
}

@Entity('social_links')
export class SocialLink extends BaseEntity {
    @Column({ type: 'enum', enum: SocialPlatform })
    platform: SocialPlatform;

    @Column()
    url: string;

    @Column({ name: 'button_label', nullable: true })
    buttonLabel: string;

    @Column({ name: 'sort_order', default: 0 })
    sortOrder: number;

    @Column({ name: 'consultant_id', type: 'uuid' })
    consultantId: string;

    @ManyToOne(() => Consultant, (consultant) => consultant.socialLinks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'consultant_id' })
    consultant: Consultant;
}
