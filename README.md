# Meletto Case Study

This project is a **Node.js + TypeScript** backend API providing basic e-commerce functionality. It offers product, category, cart, and order management. The API features JWT-based authentication and role-based access control. API documentation is available via Swagger.

## 🚀 Setup & Running

### 1. Classic Method (Development)
```bash
npm install
npx ts-node src/app.ts
```
By default, the API runs at `http://localhost:3000`.

### 2. With Docker (Recommended)
```bash
docker-compose up --build
```
- Backend: `http://localhost:3000`
- MySQL: `localhost:8889` (root/root)

> **Note:** When using Docker, the database is created automatically. No manual .env file is required.

## 🛠️ Technologies Used
- Node.js & TypeScript
- Express.js
- TypeORM
- MySQL
- JWT (jsonwebtoken)
- Swagger (swagger-ui-express, swagger-jsdoc)
- Docker

## 🧑‍💻 Seed Data
There are no automatically created sample users or admins. You can register new users via the API.

## 📚 API Documentation
You can access all endpoints and example requests/responses via the Swagger UI:

👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📦 Main API Endpoints

- **User:**
  - `POST /api/users/register` – Register
  - `POST /api/users/login` – Login (get JWT)
  - `GET /api/users/profile` – Get profile (JWT required)
- **Product:**
  - `GET /api/products` – List products
  - `POST /api/products` – Add product (admin, JWT required)
- **Category:**
  - `GET /api/categories` – List categories
  - `POST /api/categories` – Add category (admin, JWT required)
- **Cart:**
  - `POST /api/cart/items` – Add product to cart (JWT required)
  - `GET /api/cart` – View cart (JWT required)
  - `DELETE /api/cart/items/:itemId` – Remove item from cart (JWT required)
  - `DELETE /api/cart/clear` – Clear cart (JWT required)
- **Order:**
  - `POST /api/orders` – Create order (JWT required)
  - `GET /api/orders` – List orders (JWT required)

> For full endpoint details and examples, please refer to the Swagger UI.

## 👤 Developer
Berkay Oflaz  
[berkay@webandmob.com](mailto:berkay@webandmob.com) 
