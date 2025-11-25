const router = require("express").Router();
const { generateSummary } = require("../controllers/summary.controller");

router.post("/generate", generateSummary);

module.exports = router;
