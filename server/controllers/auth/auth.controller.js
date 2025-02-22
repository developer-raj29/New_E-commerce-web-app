const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
require("dotenv").config();

// Registration Controller
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already Exist or Registered With Same Email!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration is Successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Registration is Failed! Please try again",
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please Register First",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // console.log(token);

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged In Successfully",
      token: token,
      user: {
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Logged in Failed, Please try again!",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ");
    console.log("Token: ", token);
    console.log("header: ", req.header("Authorization").replace("Bearer "));

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user! No token provided.",
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "CLIENT_SECRET_KEY"
      ); // Use env variable
      req.user = decoded;
    } catch (err) {
      // varification issue message
      res.status(401).json({
        success: false,
        message: "Invalid Token",
        error: err.message,
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Unauthorized user! Invalid token.",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
