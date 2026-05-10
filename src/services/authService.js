import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const loginService = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(user)
    
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
};