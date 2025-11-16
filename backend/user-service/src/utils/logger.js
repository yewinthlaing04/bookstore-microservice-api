import winston from "winston";

const logger = winston.createLogger({
  level: process.env.ENV_LEVEL === "production" ? "info" : "debug",
  defaultMeta: { service: "user-service" },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});

export default logger;
