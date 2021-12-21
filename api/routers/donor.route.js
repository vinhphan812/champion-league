const express = require("express");

const ctrler = require("../controllers/donor.controller");

const donorMiddleware = require("../middlewares/donor.middleware");

const router = express.Router({ mergeParams: true });

router.get("/", ctrler.getDonors);

router
	.route("/:donor")
	.all(donorMiddleware)
	.get(ctrler.getDonor)
	.put(ctrler.updateDonor)
	.delete(ctrler.removeDonor);

module.exports = router;
