const router = require("express").Router();
const {
  AdminModule: { GroupController },
} = require("../../../controller/v1");
const {
  AuthToken: { checkAuth },
} = require("../../../middleware");

const GroupCtr1 = new GroupController();

router.get("/list", checkAuth, async (req, res) => {
  const result = await GroupCtr1.list(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;
