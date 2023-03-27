const { createLogger, format, transports } = require("winston");
const { combine } = format;
require('winston-mongodb');
require("dotenv").config()

const logger = createLogger({
    format: format.json(),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.MongoDB({
            level:"error",
            db:process.env.mongourl,
            collection:"logs"
        })
    ]
})

function createlog(req, res, next) {
    logger.log({
        level: "error",
    })
    next();
}

module.exports = {
    createlog
}