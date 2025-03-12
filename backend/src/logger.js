const winston = require("winston");
const path = require("path");

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, "logs/error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(__dirname, "logs/activity.log") }),
        new winston.transports.Console()
    ]
});

module.exports = logger;
