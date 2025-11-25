const router = require("express").Router();
const { getUpcoming, getPast } = require("../controllers/mcp.controller");

router.get("/events/upcoming", getUpcoming);
router.get("/events/past", getPast);

module.exports = router;
