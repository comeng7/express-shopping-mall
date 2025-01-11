import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Category } from '@/entities/Category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, collation: 'utf8mb4_unicode_ci' })
  name!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 255,
    collation: 'utf8mb4_unicode_ci',
  })
  imageUrl!: string;

  @Column({ name: 'category_id', type: 'int' })
  @Index('idx_category')
  categoryId!: number;

  @Column({
    type: 'text',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'is_new',
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Index('idx_is_new')
  isNew!: boolean;

  @Column({
    name: 'is_best',
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Index('idx_is_best')
  isBest!: boolean;

  @Column({
    name: 'view_count',
    type: 'int',
    default: 0,
  })
  viewCount!: number;

  @Column({
    name: 'sales_count',
    type: 'int',
    default: 0,
  })
  salesCount!: number;

  @Column({
    type: 'varchar',
    length: 50,
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  color?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
