import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('int')
  stock!: number;

  @ManyToOne(() => Category, category => category.products, { eager: true })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;
} 