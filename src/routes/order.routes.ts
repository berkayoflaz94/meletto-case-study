import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', authenticateJWT, orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 */
router.get('/', authenticateJWT, orderController.listOrders);

export default router; 