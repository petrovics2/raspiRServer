const winston = require('winston');
const {combine, timestamp, label, printf} = winston.format;

const customFormat = printf(info => {
    return `${info.timestamp} - [${info.level}: ${info.message}]`
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.File({filename: 'combined.log'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
});

module.exports = logger;