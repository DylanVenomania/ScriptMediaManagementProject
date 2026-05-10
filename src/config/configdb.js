const mongoose = require('mongoose');
require('dotenv').config(); // Đảm bảo đã load biến môi trường

let connectDB = async () => {
    try {
        // Thay vì dán link trực tiếp, ta gọi từ file .env
        const dbURI = process.env.MONGO_URI; 
        
        await mongoose.connect(dbURI);
        
        console.log('>>> MongoDB Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Dừng app nếu không kết nối được DB
    }
}

module.exports = connectDB;