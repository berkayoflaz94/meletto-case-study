import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';

export const createOrder = async (req: any, res: Response) => {
  const userId = req.user.id;
  const cartRepo = AppDataSource.getRepository(Cart);
  const cart = await cartRepo.findOne({ where: { user: { id: userId } }, relations: ['cartItems', 'cartItems.product'] });
  if (!cart || !cart.cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);

  let total = 0;
  const orderItems: OrderItem[] = [];
  for (const item of cart.cartItems) {
    const orderItem = orderItemRepo.create({
      productName: item.product.name,
      productPrice: item.product.price,
      quantity: item.quantity,
    });
    total += Number(item.product.price) * item.quantity;
    orderItems.push(orderItem);
  }

  const order = orderRepo.create({
    user: cart.user,
    orderItems,
    total,
  });
  await orderRepo.save(order);

  // Sepeti temizle
  const cartItemRepo = AppDataSource.getRepository(CartItem);
  await cartItemRepo.delete({ cart: { id: cart.id } });

  res.status(201).json(order);
};

export const listOrders = async (req: any, res: Response) => {
  const userId = req.user.id;
  const orderRepo = AppDataSource.getRepository(Order);
  const orders = await orderRepo.find({ where: { user: { id: userId } }, relations: ['orderItems'] });
  res.json(orders);
}; 