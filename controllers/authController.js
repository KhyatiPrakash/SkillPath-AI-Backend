import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Career from "../models/Career.js";

// ===============================
// @desc Register User
// @route POST /api/auth/register
// @access Public
// ===============================
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

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

// ===============================
// @desc Login User
// @route POST /api/auth/login
// @access Public
// ===============================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }

  const user = await User.findOne({ email });

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

// ===============================
// @desc Logout User
// @route POST /api/auth/logout
// @access Private
// ===============================
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure:
      process.env.NODE_ENV === "production" || !!process.env.CLIENT_URL,
    sameSite:
      process.env.NODE_ENV === "production" || !!process.env.CLIENT_URL
        ? "none"
        : "strict",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// ===============================
// @desc Get Current User Profile
// @route GET /api/auth/profile
// @access Private
// ===============================
export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

// @desc Save Career
// @route POST /api/auth/save-career/:careerId
// @access Private

export const saveCareer = asyncHandler(async (req, res) => {
  try {
    console.log("===== SAVE CAREER =====");

    const user = await User.findById(req.user._id);
    const { careerId } = req.params;

    const career = await Career.findById(careerId);

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    console.log("Before push:", user.savedCareers);

    if (!user.savedCareers.includes(careerId)) {
      user.savedCareers.push(careerId);

      console.log("After push:", user.savedCareers);

      await user.save();

      console.log("User saved successfully");
    }

    return res.status(200).json({
      message: "Career saved successfully",
      savedCareers: user.savedCareers,
    });

  } catch (error) {
    console.error("SAVE CAREER ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// @desc Get Saved Careers
// @route GET /api/auth/saved-careers
// @access Private

export const getSavedCareers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedCareers");

  res.status(200).json(user.savedCareers);
});