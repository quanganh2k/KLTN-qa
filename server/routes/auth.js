const express = require("express");
const router = express.Router();
const argon2 = require("argon2"); // thư viện này dùng để hash password
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");

const auth = require('../middleware/auth')

const User = require("../models/User");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    res.json({success: true, user})
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})


// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validation
  // firstName: tên, lastName: họ
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn cần điền đẩy đủ thông tin" });
  }

  try {
    // Required email
    if (!emailvalidator.validate(email)) {
      return res.status(400).json({ message: "Email của bạn không hợp lệ" });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email của bạn đã tồn tại" });
    }

    // Required password
    if (password.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.json({
      success: true,
      message: "Bạn đã đăng ký tài khoản thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn cần điền đẩy đủ thông tin" });
  }

  try {
    if (!emailvalidator.validate(email)) {
      return res.status(400).json({ message: "Email của bạn không hợp lệ" });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc mật khẩu của bạn không chính xác",
      });
    }

    // email exist, check password
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc mật khẩu của bạn không chính xác",
      });
    }

    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "Bạn đã đăng nhập thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
