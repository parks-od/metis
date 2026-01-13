import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('menus')
export class Menu extends BaseEntity {
    @Column()
    name: string;

    @Column()
    link: string;

    @Column({ name: 'sort_order', default: 0 })
    sortOrder: number;

    @Column({ name: 'is_visible', default: true })
    isVisible: boolean;

    @Column({ name: 'parent_id', nullable: true, type: 'uuid' })
    parentId: string;

    @ManyToOne(() => Menu, (menu) => menu.children, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_id' })
    parent: Menu;

    @OneToMany(() => Menu, (menu) => menu.parent)
    children: Menu[];
}
