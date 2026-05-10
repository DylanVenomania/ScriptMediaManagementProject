const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // dùng SSL
    auth: {
        user: 'tqd200040@gmail.com', // Email của bạn
        pass: 'wvnb svfw oqqe nkcg', // 16 ký tự App Password bạn vừa lấy
    },
});

module.exports = transporter;