import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Index } from 'typeorm';
import { Product } from '@/entities/Product.entity';
import { TCategoryCode } from '@/types/category.types';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, collation: 'utf8mb4_unicode_ci' })
  name!: string;

  @Column({
    type: 'varchar',
    length: 50,
    collation: 'utf8mb4_unicode_ci',
    unique: true,
    transformer: {
      to: (value: TCategoryCode) => value,
      from: (value: string) => value as TCategoryCode,
    },
  })
  @Index('idx_code')
  code!: TCategoryCode;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
