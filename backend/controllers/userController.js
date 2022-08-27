import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

//@desc Authenticate a user
//@route POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user email userExists
  const user = await User.findOne({ email });

  //if user exists compare password typed with the user's password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  res.status(200).json({ message: "logged in" });
});

//@desc Create a User
//@route POST api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please make sure you fill all fields with correct values");
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc Get user data
//@route GET api/users/me
//@access Private
const getUserData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Update a user
//@route PUT api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(400);
  const updatedUser = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

//Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

export { loginUser, registerUser, updateUser, getUserData };
