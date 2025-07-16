import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const categoryRepo = AppDataSource.getRepository(Category);
  const existing = await categoryRepo.findOneBy({ name });
  if (existing) return res.status(409).json({ message: 'Category already exists' });
  const category = categoryRepo.create({ name });
  await categoryRepo.save(category);
  res.status(201).json(category);
};

export const listCategories = async (req: Request, res: Response) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();
  res.json(categories);
}; 