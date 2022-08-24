const express = require("express");
const router = express.Router();

const bcRouter = require("./bc.route");
const userRouter = require("./user.route");
const webhookRouter = require("./webhook.route");

// Users
router.use("/users", userRouter);
router.use("/webhooks", webhookRouter);
router.use("/blockchain", bcRouter);

router.get("*", (req, res, next) => {
  res.status(404).json({ message: "You landed on moon" });
});

module.exports = router;
