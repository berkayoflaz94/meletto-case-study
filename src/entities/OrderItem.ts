import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './Order';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
  order!: Order;

  @Column()
  productName!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  productPrice!: number;

  @Column('int')
  quantity!: number;
} 