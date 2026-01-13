import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

export enum BoardSkin {
    LIST = 'LIST',
    GALLERY = 'GALLERY',
    WEBZINE = 'WEBZINE',
    FAQ = 'FAQ',
}

@Entity('board_configs')
export class BoardConfig extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'enum', enum: BoardSkin, default: BoardSkin.LIST })
    skin: BoardSkin;

    @Column({ name: 'write_permission', default: 'ADMIN' }) // 'ADMIN' or 'USER' or 'ALL'
    writePermission: string;

    @Column({ name: 'use_comment', default: false })
    useComment: boolean;

    @OneToMany(() => Post, (post) => post.boardConfig)
    posts: Post[];
}
