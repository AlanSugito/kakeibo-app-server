import winston from "winston"
import moment from "moment"

const logger = winston.createLogger({
  format: winston.format.printf(({level, message}) => {
    const timestamp = moment().format("DD-MM-YYYY HH:mm:ss")
    return `${timestamp} ${level}: ${message}`
  }),
  transports: [new winston.transports.Console()]
})

export default logger