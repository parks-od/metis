import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Consultant } from './consultant.entity';

export enum InquiryStatus {
    PENDING = 'PENDING',
    CHECKED = 'CHECKED',
    CONSULTING = 'CONSULTING',
    DONE = 'DONE',
}

@Entity('inquiries')
export class Inquiry extends BaseEntity {
    @Column({ name: 'customer_name' })
    customerName: string;

    @Column()
    contact: string;

    @Column({ name: 'company_name', nullable: true })
    companyName: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ name: 'privacy_agreement', default: false })
    privacyAgreement: boolean;

    @Column({ type: 'enum', enum: InquiryStatus, default: InquiryStatus.PENDING })
    status: InquiryStatus;

    @Column({ name: 'consultant_id', type: 'uuid', nullable: true })
    consultantId: string;

    @ManyToOne(() => Consultant, (consultant) => consultant.inquiries, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'consultant_id' })
    consultant: Consultant;
}
