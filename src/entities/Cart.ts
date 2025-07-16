import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  cartItems!: CartItem[];
} 