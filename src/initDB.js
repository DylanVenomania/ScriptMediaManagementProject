require('dotenv').config();
const db = require('./models'); 

const resetData = async () => {
  try {
    await db.mongoose.connect(process.env.MONGO_URI);
    
    // 1. Xóa sạch bảng cũ
    await db.User.deleteMany({});
    console.log(">>> Đã dọn sạch dữ liệu cũ.");

    // 2. Tạo dữ liệu mẫu đầy đủ các trường (Trừ username đã bỏ)
    await db.User.create({
      email: "diep.admin@hcmute.edu.vn",
      password: "password_da_hash_bcrypt", // Trong code thật sẽ dùng bcrypt
      role: "admin",
      isActivated: true,
      otpCode: "123456",
      otpExpires: new Date(Date.now() + 10*60000), // Hết hạn sau 10 phút
      fullName: "Trương Quang Điệp",
      avatar: "https://i.pravatar.cc/300" // Link ảnh giả để test
    });

    console.log(">>> Reset thành công! Giờ lên Atlas hưởng thụ thành quả nhé.");
    process.exit();
  } catch (error) {
    console.error("Lỗi rồi!", error);
    process.exit(1);
  }
};

resetData();