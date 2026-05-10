import express from 'express';
import { registerLimiter } from '../middlewares/rateLimit.js'; // Bắt buộc có .js
import { validateRegister } from '../middlewares/validation.js';
import * as authController from '../controller/authController.js';

const router = express.Router();

// Route Đăng ký áp dụng Rate Limit (Lớp bảo mật 2)
router.post('/register', registerLimiter, validateRegister, authController.register);
router.post('/verify-otp', authController.verifyOTP);
export default router;