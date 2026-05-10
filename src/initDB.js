import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js'; // Đảm bảo đường dẫn và đuôi .js chính xác

const resetData = async () => {
  try {
    // Kết nối trực tiếp bằng mongoose vì ta dùng model lẻ
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Xóa sạch bảng cũ
    await User.deleteMany({});
    console.log(">>> Đã dọn sạch dữ liệu cũ trong bảng users.");

    // 2. Tạo dữ liệu mẫu (Seeding)
    await User.create({
      email: "23110205@student.hcmute.edu.vn",
      password: "password_da_hash_bcrypt", 
      isActivated: true,
      otpCode: "123456",
      otpExpires: new Date(Date.now() + 10 * 60000), // Hết hạn sau 10 phút
      fullName: "Trương Quang Điệp",
      avatar: "https://i.pravatar.cc/300" 
    });

    console.log(">>> Reset thành công! Dữ liệu mới đã được đẩy lên MongoDB Atlas.");
    process.exit(0);
  } catch (error) {
    console.error("Gặp lỗi trong quá trình reset dữ liệu:", error);
    process.exit(1);
  }
};

// Thực thi hàm
resetData();