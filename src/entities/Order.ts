import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems!: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;

  @CreateDateColumn()
  createdAt!: Date;
} 