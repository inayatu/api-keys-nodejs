const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const uuid = require("uuid");
const crypto = require("crypto");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const User = require("../models/user.model");

const { JWT_SECRET } = require("../config");

exports.createUser = catchAsync(async (req, res, next) => {
  const { user: admin } = req;
  const { email, name, password, host } = req.body;

  const user = await User.findOne({ email });
  if (user) return next(new AppError("User already exists", 409));

  const apiKey = uuid.v4();
  const apiToken = crypto.randomBytes(14).toString("hex");

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    await User.create({
      email,
      name,
      password: hash,
      host: host,
      apiKey,
      apiToken,
      createdBy: ObjectId(admin._id),
    });
    res.json({ status: "success", message: "User created " });
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new AppError("Invalid credentials", 400));

  bcrypt.compare(password, user.password, (err, passwordMatched) => {
    if (!passwordMatched) return next(new AppError("Invalid credentials", 400));
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res.json({ token });
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.json({ users: users ? users : [] });
});

exports.deletUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await User.deleteOne({ _id: ObjectId(user._id) });
  res.json({
    message: "User deleted",
  });
});
