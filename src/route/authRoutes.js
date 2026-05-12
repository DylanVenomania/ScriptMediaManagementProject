import express from 'express';
import * as authController from '../controller/authController.js';
import * as userController from '../controller/userController.js';
import { login } from '../controller/authController.js';
import { registerLimiter } from '../middlewares/rateLimit.js';
import { validateRegister } from '../middlewares/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeRole from '../middlewares/roleMiddleware.js';
import loginLimiter from '../middlewares/rateLimitMiddleware.js';
import { body } from 'express-validator';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Register & Login
router.post('/register', registerLimiter, validateRegister, authController.register);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', loginLimiter, body('email').isEmail(), body('password').isLength({ min: 6 }), login);

// Profile
router.get('/user/profile', authMiddleware, authorizeRole('user'), (req, res) => {
    res.json({ message: 'Welcome user', user: req.user });
});

router.get('/admin/profile', authMiddleware, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome admin', user: req.user });
});

router.put(
    '/edit-profile', 
    authMiddleware, 
    upload.single('avatar'), 
    userController.default.handleEditProfile
);

router.post('/forgot-password', userController.default.handleForgotPassword);
router.post('/verify-forgot-password-otp',userController.default.handleVerifyForgotPasswordOTP);
router.post('/reset-password', userController.default.handleResetPassword);
router.put('/edit-profile',authMiddleware, userController.default.handleEditProfile);
router.put('/edit-profile', authMiddleware, upload.single('avatar'), userController.default.handleEditProfile);

export default router;