import pino from "pino";

const logger = pino(pino.destination("./logger.log"));

export default logger;
