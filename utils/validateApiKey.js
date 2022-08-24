const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../models/user.model");
const BlockchainApiLog = require("../models/api-logs.model");

const { API_MAX_USE_PER_DAY } = require("../config");

exports.validateApi = async (req, res, next) => {
  const host = req.headers.host;
  const { txH } = req.body;
  const { tokenId, orderId } = req.params;

  const apiKey = req.header("x-api-key");
  if (!apiKey) return res.status(403).send({ message: "Unauthorized." });

  const user = await User.findOne({ apiKey: apiKey, host: host });
  if (!user)
    return res
      .status(403)
      .send({ message: "Unauthorized. Invalid API KEY or HOST" });

  //check the usage
  const today = new Date().toISOString().split("T")[0];
  const usageIndex = user.usage.findIndex(
    (day) => new Date(day.date).toISOString().split("T")[0] == today
  );
  if (usageIndex >= 0) {
    //already used today

    if (user.usage[usageIndex].count >= API_MAX_USE_PER_DAY)
      //stop and respond
      return res.status(429).send({
        message: "Max API calls exceeded.",
      });

    //have not hit todays max usage
    user.usage[usageIndex].count++;

    // save
    user.save();

    // Maintain the logs
    BlockchainApiLog.create({
      apiKey,
      txH,
      tokenId,
      orderId,
      apiUser: ObjectId(user._id),
    });

    next();
  } else {
    //not today yet
    user.usage.push({ date: new Date(), count: 1 });

    // save
    user.save();

    // Maintain the logs
    BlockchainApiLog.create({
      apiKey,
      txH,
      tokenId,
      orderId,
      apiUser: ObjectId(user._id),
    });

    next();
  }
};
