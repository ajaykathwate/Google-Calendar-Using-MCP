const router = require("express").Router();
const { startAuth, completeConnection, getSessionInfo } = require("../controllers/auth.controller");

router.get("/start", startAuth);
router.post("/callback", completeConnection);
router.get("/me", getSessionInfo);

module.exports = router;
