const express = require("express");
const router = express.Router();

const bcCtrl = require("../controllers/bc.ctrl");

const { validateApi } = require("../utils/validateApiKey");

router.route("/mint/:tokenId").post(validateApi, bcCtrl.mintToken);
router.route("/addorder/:orderId").post(validateApi, bcCtrl.addOrder);

module.exports = router;
