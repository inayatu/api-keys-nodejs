const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../models/user.model");

const AppError = require("./appError");

const { JWT_SECRET } = require("../config");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) return next(new AppError("Unauthenticated request", 401));

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return next(new AppError("Unauthenticated request", 401));
    const user = await User.findOne({ _id: ObjectId(decoded._id) });
    if (!user) return next(new AppError("Unauthenticated request", 401));
    req.user = user;
    next();
  });
};

exports.authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role))
      return next(new AppError("Unathorized request", 403));
    next();
  };
};
