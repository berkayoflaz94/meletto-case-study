import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, categoryId } = req.body;
  if (!name || !price || stock == null || !categoryId) return res.status(400).json({ message: 'Name, price, stock, and categoryId required' });
  const productRepo = AppDataSource.getRepository(Product);
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.findOneBy({ id: categoryId });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  const product = productRepo.create({ name, description, price, stock, category });
  await productRepo.save(product);
  res.status(201).json(product);
};

export const listProducts = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { categoryId } = req.query;
  let products;
  if (categoryId) {
    products = await productRepo.find({ where: { category: { id: Number(categoryId) } } });
  } else {
    products = await productRepo.find();
  }
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOneBy({ id: Number(req.params.id) });
  if (!product) return res.sendStatus(404);
  res.json(product);
}; 