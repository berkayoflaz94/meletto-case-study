import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, cart => cart.cartItems, { onDelete: 'CASCADE' })
  cart!: Cart;

  @ManyToOne(() => Product)
  product!: Product;

  @Column('int')
  quantity!: number;
} 