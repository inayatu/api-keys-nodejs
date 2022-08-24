const express = require("express");
const router = express.Router();

const webhookCtrl = require("../controllers/webook.ctrl");

const { authenticate, authorize } = require("../utils/middleware");

router
  .route("/")
  .post(authenticate, authorize("admin"), webhookCtrl.createWebHook)
  .get(authenticate, authorize("admin"), webhookCtrl.getWebhooks);

router
  .route("/:webhookId")
  .get(authenticate, authorize("admin"), webhookCtrl.getWebhook);

module.exports = router;
