import express from 'express'

import { body } from 'express-validator'

import { login } from '../controller/authController.js'

import authMiddleware from '../middlewares/authMiddleware.js'

import authorizeRole from '../middlewares/roleMiddleware.js'

import loginLimiter from '../middlewares/rateLimitMiddleware.js'

const router = express.Router()

router.post(
    '/login',

    loginLimiter,

    body('email').isEmail(),

    body('password').isLength({ min: 6 }),

    login
)

router.get(
    '/user/profile',

    authMiddleware,

    authorizeRole('user'),

    (req, res) => {

        res.json({
            message: 'Welcome user',
            user: req.user
        })
    }
)

router.get(
    '/admin/profile',

    authMiddleware,

    authorizeRole('admin'),

    (req, res) => {

        res.json({
            message: 'Welcome admin',
            user: req.user
        })
    }
)

export default router