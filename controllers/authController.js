import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc Register User
// @route POST /api/auth/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login User
// @route POST /api/auth/login
// @access Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }

  // Find user
  const user = await User.findOne({ email });

  // Check password
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get Current User
// @route GET /api/auth/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});