const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "developer"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    apiKey: { type: String, required: true },
    apiToken: { type: String, required: true },
    host: {
      type: String,
      required: true,
    },
    usage: [
      {
        date: { type: Date },
        count: 0,
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
