import express from "express";
import bodyParser from "body-parser";
import initApiRoutes from "./route/authRoutes"; // Đổi tên cho đúng bản chất API
import connectDB from "./config/configdb";
import cors from "cors"; // Nên thêm cái này để gọi API từ bên ngoài không bị lỗi
import authRoutes from './route/authRoutes.js'

require('dotenv').config();

let app = express();

// 1. Cấu hình Middleware
app.use(cors({ origin: true })); // Cho phép các ứng dụng khác gọi API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 2. Kết nối CSDL MongoDB Atlas
connectDB();

// 3. Khởi tạo Routes (Đã bỏ viewEngine vì mình làm API)
app.use('/api', authRoutes);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("--------------------------------------------------");
    console.log(`>>> SMM Project API is running on port: ${port}`);
    console.log("--------------------------------------------------");
});