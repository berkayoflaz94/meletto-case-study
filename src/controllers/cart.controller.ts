import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';
import { User } from '../entities/User';

// Kullanıcıya ait sepeti bul veya oluştur
async function getOrCreateCart(userId: number) {
  const cartRepo = AppDataSource.getRepository(Cart);
  let cart = await cartRepo.findOne({ where: { user: { id: userId } }, relations: ['cartItems', 'cartItems.product'] });
  if (!cart) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');
    cart = cartRepo.create({ user, cartItems: [] });
    await cartRepo.save(cart);
  }
  return cart;
}

// Sepete ürün ekle
export const addToCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) return res.status(400).json({ message: 'productId and quantity required' });
  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOneBy({ id: productId });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const cart = await getOrCreateCart(userId);
  const cartItemRepo = AppDataSource.getRepository(CartItem);
  let cartItem = cart.cartItems.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItemRepo.save(cartItem);
  } else {
    cartItem = cartItemRepo.create({ cart, product, quantity });
    await cartItemRepo.save(cartItem);
    cart.cartItems.push(cartItem);
    await AppDataSource.getRepository(Cart).save(cart);
  }
  res.status(201).json(cart);
};

// Sepeti listele
export const getCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await getOrCreateCart(userId);
  res.json(cart);
};

// Sepetten ürün çıkar
export const removeFromCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const cart = await getOrCreateCart(userId);
  const cartItemRepo = AppDataSource.getRepository(CartItem);
  const cartItem = await cartItemRepo.findOneBy({ id: Number(itemId) });
  if (!cartItem || cartItem.cart.id !== cart.id) return res.status(404).json({ message: 'Cart item not found' });
  await cartItemRepo.remove(cartItem);
  res.json({ message: 'Item removed' });
};

// Sepeti temizle
export const clearCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await getOrCreateCart(userId);
  const cartItemRepo = AppDataSource.getRepository(CartItem);
  await cartItemRepo.delete({ cart: { id: cart.id } });
  res.json({ message: 'Cart cleared' });
}; 