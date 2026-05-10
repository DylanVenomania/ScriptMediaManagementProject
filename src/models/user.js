const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    isActivated: { type: Boolean, default: false },
    otpCode: { type: String },
    otpExpires: { type: Date },
    fullName: { type: String },
    avatar: { type: String }
}, {
    timestamps: true, 
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);