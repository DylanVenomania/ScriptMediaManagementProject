import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

const initApiRoutes = (app) => {
    router.post('/api/forgot-password', userController.handleForgotPassword);
    router.post('/api/reset-password', userController.handleResetPassword);
    router.put('/api/edit-profile', userController.handleEditProfile);

    return app.use('/', router);
}

export default initApiRoutes;