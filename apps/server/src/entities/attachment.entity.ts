import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity('attachments')
export class Attachment extends BaseEntity {
    @Column({ name: 'original_name' })
    originalName: string;

    @Column({ name: 'saved_name' })
    savedName: string;

    @Column({ name: 'file_path' })
    filePath: string;

    @Column({ type: 'int' })
    size: number;

    @Column()
    extension: string;

    @Column({ name: 'post_id', type: 'uuid', nullable: true })
    postId: string;

    @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
