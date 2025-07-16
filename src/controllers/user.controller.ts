import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const userRepo = AppDataSource.getRepository(User);
  const existing = await userRepo.findOneBy({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ email, password: hashed, role: role === 'admin' ? 'admin' : 'user' });
  await userRepo.save(user);
  res.status(201).json({ id: user.id, email: user.email, role: user.role });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

export const profile = async (req: any, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: req.user.id });
  if (!user) return res.sendStatus(404);
  res.json({ id: user.id, email: user.email, role: user.role });
}; 