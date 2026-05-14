import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { sendOTP } from '../utils/sendEmail.js';

export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // 1. Kiểm tra email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (existingUser.isActivated) {
            throw new Error('Email đã được sử dụng.');
        }
        // Nếu chưa kích hoạt -> Cập nhật thông tin mới và gửi OTP mới
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.otpCode = otp;
        existingUser.otpExpires = new Date(Date.now() + 10 * 60000);

        await existingUser.save();
        await sendOTP(email, otp);
        return existingUser;
    }

    // Tạo mới nếu chưa có email này trong hệ thống
        // 2. Mã hóa mật khẩu (Lớp bảo mật dữ liệu)
    const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Tạo mã OTP (6 chữ số ngẫu nhiên)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 phút

    // 4. Lưu người dùng tạm thời (isActivated: false)
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        otpCode: otp,
        otpExpires,
        isActivated: false
    });

    // 5. Gửi email chứa OTP
    await sendOTP(email, otp);

    return newUser;
};

export const verifyOTP = async (email, otp) => {
    // 1. Tìm người dùng theo email và mã OTP còn hạn
    const user = await User.findOne({
        email,
        otpCode: otp,
        otpExpires: { $gt: Date.now() } // Kiểm tra mã chưa hết hạn
    });

    if (!user) {
        throw new Error('Mã OTP không chính xác hoặc đã hết hạn.');
    }

    // 2. Kích hoạt tài khoản và xóa mã OTP đã dùng
    user.isActivated = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();
};

export const loginService = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(user)
    
    if (!user) {
        throw new Error('User not found');
    }
    // Chỉ cho login nếu đã kích hoạt
    if (!user.isActivated) throw new Error('Tài khoản chưa được kích hoạt OTP!');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
};