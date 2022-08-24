const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.ctrl");

const { authenticate, authorize } = require("../utils/middleware");

router.route("/").get(authenticate, authorize("admin"), userCtrl.getUsers);
// router.route("/").delete(authenticate, authorize("admin"), userCtrl.deletUser);

router.route("/login").post(userCtrl.login);
router
  .route("/create")
  .post(authenticate, authorize("admin"), userCtrl.createUser);

module.exports = router;
