import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 8889,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'meletto',
  synchronize: true, // Geliştirme için true, prod'da false olmalı
  logging: false,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [],
  subscribers: [],
}); 