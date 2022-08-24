const ObjectId = require("mongoose").Types.ObjectId;

const Webhook = require("../models/webhooks.model");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createWebHook = catchAsync(async (req, res, next) => {
  const { user: admin } = req;
  const { hookType, url, userId } = req.body;

  const user = await User.findOne({ _id: ObjectId(userId) });
  if (!user) return next(new AppError("No user found", 400));

  const webhook = await Webhook.create({
    hookType,
    url,
    user: ObjectId(user._id),
    createdBy: admin._id,
  });
  res.json({ webhook });
});

exports.getWebhooks = catchAsync(async (req, res, next) => {
  const queryString = req.query;

  const webhooks = await Webhook.find(queryString)
    .populate("user", "name email")
    .populate("createdBy", "name email");

  res.json({ webhooks });
});

exports.getWebhook = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { webhookId } = req.params;

  const webhook = await Webhook.findOne({
    _id: ObjectId(webhookId),
    user: ObjectId(user._id),
  }).populate("user", "name email");

  res.json({ webhook });
});
