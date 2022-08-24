/**
 * Inayat Ullah
 *
 * Keep the logs of API calls from different API client
 *  */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlockchainApiLogsSchema = new Schema(
  {
    apiKey: { type: String, requried: true },
    txH: { type: String, requried: true },
    tokenId: { type: String },
    orderNumber: { type: String },
    apiUser: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = BlockchainApiLog = mongoose.model(
  "BlockchainApiLog",
  BlockchainApiLogsSchema
);
