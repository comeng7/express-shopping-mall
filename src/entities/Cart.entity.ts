import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { CartItem } from '@/entities/CartItem.entity';
import { User } from '@/entities/User.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  user!: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems?: CartItem[];
}
