import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '@/entities/Category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({ name: 'image_url' })
  imageUrl!: string;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @Column()
  description!: string;

  @Column({ name: 'is_new', default: false })
  isNew!: boolean;

  @Column({ name: 'is_best', default: false })
  isBest!: boolean;

  @Column({ name: 'view_count', default: 0 })
  viewCount!: number;

  @Column({ name: 'sales_count', default: 0 })
  salesCount!: number;

  @Column()
  color!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
