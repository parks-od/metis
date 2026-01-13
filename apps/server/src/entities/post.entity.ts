import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BoardConfig } from './boardConfig.entity';
import { Admin } from './admin.entity';
import { Attachment } from './attachment.entity';

@Entity('posts')
export class Post extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ name: 'author_name' })
    authorName: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ name: 'view_count', default: 0 })
    viewCount: number;

    @Column({ name: 'is_notice', default: false })
    isNotice: boolean;

    @Column({ name: 'board_config_id', type: 'uuid' })
    boardConfigId: string;

    @ManyToOne(() => BoardConfig, (boardConfig) => boardConfig.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_config_id' })
    boardConfig: BoardConfig;

    @Column({ name: 'admin_id', type: 'uuid', nullable: true })
    adminId: string;

    @ManyToOne(() => Admin, (admin) => admin.posts, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'admin_id' })
    admin: Admin;

    @OneToMany(() => Attachment, (attachment) => attachment.post, { cascade: true })
    attachments: Attachment[];
}
