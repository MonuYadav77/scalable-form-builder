const userModel = require('../modules/auth/user.model');
const logger = require('../utils/logger');

const requestlogger = (req,res, next) =>{
    const start =  Date.now();

    res.on('finish', ()=>{
        const duration = Date.now() - start;
        logger.info({
            message : 'api request',
            method : req.method,
            url: req.originalUrl,
            status : res.statusCode,
            duration: `${duration}ms`,
            user : req.user ?.id || 'guest',
        })
    })
    next();

};

module.exports = requestlogger; 