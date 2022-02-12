const winston = require('winston')
const dayjs = require('dayjs')

const dev = process.env.NODE_ENV !== 'production'

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      timestamp: function() {
        return dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')
      },
      level: 'error',
      maxsize: 10485760,
      maxFiles: 10,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      timestamp: function() {
        return dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')
      },
      maxsize: 10485760,
      maxFiles: 10,
    }),
  ],
})

if (dev) {
  logger.add(
    new winston.transports.Console({
      timestamp: function() {
        return dayjs(Date.now()).format('YYYY/MM/DD/ HH:mm:ss')
      },
      format: winston.format.combine(winston.format.simple()),
    }),
  )
}

module.exports = logger
