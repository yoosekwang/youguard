const express = require("express");
const fs = require("fs");
const path = require("path");
const logger = require("../logger");

const router = express.Router();

router.post("/", (req, res) => {
    const { type, message } = req.body;
    
    if (type === "info") {
        logger.info(message);
    } else if (type === "warn") {
        logger.warn(message);
    } else {
        logger.error(message);
    }

    res.json({ message: "Log recorded" });
});

router.get("/", (req, res) => {
    try {
        const logs = fs.readFileSync(path.join(__dirname, "../logs/activity.log"), "utf8");
        res.json({ logs: logs.split("\n") });
    } catch (err) {
        res.status(500).json({ message: "Could not read logs" });
    }
});

module.exports = router;
