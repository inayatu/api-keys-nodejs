const mongoose = require("mongoose");

const { Schema } = mongoose;

const ApiKeySchema = new Schema(
  {
    key: { type: String, required: true },
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    host: {
      type: String,
      required: true,
    },
    usage: {
      date: { type: Date },
      count: 0,
    },
  },
  { timestamps: true }
);

module.exports = ApiKey = mongoose.model("ApiKey", ApiKeySchema);
