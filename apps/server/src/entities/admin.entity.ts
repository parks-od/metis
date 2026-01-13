import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity('admins')
export class Admin extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column({ select: false }) // Password should not be exposed by default
    password: string;

    @Column()
    nickname: string;

    @Column({ name: 'last_login_at', nullable: true, type: 'timestamp' })
    lastLoginAt: Date;

    @OneToMany(() => Post, (post) => post.admin)
    posts: Post[];
}
