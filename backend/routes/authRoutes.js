import express from 'express';
import AuthController from '../controllers/authcontrollers.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

export default router;