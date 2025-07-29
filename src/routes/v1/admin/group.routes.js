const router = require("express").Router();
const {
  AdminModule: { GroupController },
} = require("../../../controller/v1");
const {
  AuthToken: { checkAuth },
} = require("../../../middleware");
const upload = require("../../../utils/multer.util");

const GroupCtr1 = new GroupController();

router.get("/list", checkAuth, async (req, res) => {
  const result = await GroupCtr1.list(req, res);
  return res.status(result.status).send(result);
});

router.post("/create", upload.single("file"), async (req, res) => {
  const result = await GroupCtr1.create(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;
