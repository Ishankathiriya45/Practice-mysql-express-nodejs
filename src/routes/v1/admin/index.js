const router = require("express").Router();

router.use("/group", require("./group.routes"));

module.exports = router;
