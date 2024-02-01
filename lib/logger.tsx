import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // File transport
    new winston.transports.File({ filename: "logs/error.log" }),
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

const loggerInfo = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message} ${
            info.meta ? JSON.stringify(info.meta) : ""
          }`;
        })
      ),
    }),
    //new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Function to log error
export function logError(err: any) {
  logger.error(err);
}

export function logInfo(info: any) {
  loggerInfo.info({ meta: info });
}

// Example usage
try {
  // Some code that might throw an error
} catch (error) {
  logError(error);
}
