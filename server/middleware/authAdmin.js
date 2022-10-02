const User = require("../models/User");

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await User.findOne({
      _id: req.user.userId,
    });
    if (user.role === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Admin resources access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authAdmin;
