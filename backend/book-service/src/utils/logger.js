import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "book-api-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    new winston.transports.File({ filename: "warning.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export default logger;
