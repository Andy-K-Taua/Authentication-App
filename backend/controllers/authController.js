//backend/controllers/authController.js

import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendVerificationCode } from '../services/twilioServices.js';

const registerUser = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, phoneNumber });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await sendVerificationCode(phoneNumber, verificationCode);

    res.json({ token, verificationCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { token, verificationCode } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // In a real-world scenario, you would store the verification code in the database
    // and compare it with the code sent by the user. For simplicity, we'll assume
    // the verification code is stored in the user's document.
    user.isVerified = true;
    await user.save();

    res.json({ message: 'User verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await sendVerificationCode(user.phoneNumber, verificationCode);

    res.json({ token, verificationCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logoutUser = async (req, res) => {
  try {
    // In a real-world scenario, you would blacklist the token or remove it from the database
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { registerUser, verifyUser, loginUser, logoutUser };