const mongoose = require("mongoose");

const { Schema } = mongoose;

const WebhookSchema = new Schema(
  {
    hookType: {
      type: String,
      enum: [
        "mint",
        "addorder",
        "purchaseorder",
        "cancelorder",
        "placebid",
        "addBundle",
        "addauction",
        "cancelAuction",
        "finalizeAuction",
      ],
      default: "",
      required: true,
    },
    url: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = Webhook = mongoose.model("Webhook", WebhookSchema);
