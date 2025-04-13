import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', UserController.createUser); // Registration

// Protected routes
router.get('/', authenticate, authorize(['ADMIN']), UserController.getAllUsers);
router.get('/me', authenticate, UserController.getCurrentUser);
router.get('/:id', authenticate, UserController.getUserById);

export default router;