import { validationResult } from 'express-validator'

import { loginService } from '../services/authService.js'

import generateToken from '../utils/jwt.js'

export const login = async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }

        const { email, password } = req.body

        const user = await loginService(email, password)

        const token = generateToken.generateToken(user)

        return res.json({
            message: 'Login success',
            token,
            role: user.role
        })

    } catch (error) {

        return res.status(401).json({
            message: error.message
        })
    }
}