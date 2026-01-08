const logger = require ('../utils/logger');

const errorhandler = (err,req,res,next)=>{
    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        user: req.user?.id || 'guest',
    });

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorhandler;