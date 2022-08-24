const ObjectId = require("mongoose").Types.ObjectId;
const uuid = require("uuid");
const crypto = require("crypto");

const ApiKey = require("../models/api-keys.model");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.mintToken = catchAsync(async (req, res, next) => {
  const { tokenId } = req.params;
  const { txh } = req.body;

  res.json({ message: `${tokenId} minted` });
});
exports.addOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { txh } = req.body;

  res.json({ message: `${orderId} added` });
});

exports.createApiKey = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { userId } = req.body;

  const apiUser = await User.findOne({ _id: ObjectId(userId) });
  if (!apiUser) return next(new AppError("No user found", 400));

  const key = uuid.v4();
  const token = crypto.randomBytes(14).toString("hex");

  const api = await ApiKey.create({
    key,
    token,
    user: ObjectId(apiUser._id),
    createdBy: ObjectId(user._id),
  });
  res.json({ api });
});

exports.getApiKey = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  // Only user or the owner of API should be able to retrieve the data
  const api = await ApiKey.findOne({
    _id: ObjectId(id),
    $or: [{ createdBy: ObjectId(user._id) }, { user: ObjectId(user._id) }],
  })
    .populate("createdBy", "name email")
    .populate("user", "name email");

  res.json({ api });
});
