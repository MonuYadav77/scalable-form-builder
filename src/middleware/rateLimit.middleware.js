
const redisClient = require('../config/redis.js');

const rateLimit = async (req, res, next) =>{
    try{
        // userId comes from the jwt auth middleware
        const userId = req.user;

        if(!userId){
            return res.status(401).json({ message: 'unauthorized' });
        }

        const LIMIT = 5; //max 5 requests
        const WINDOW = 60; //per 60 seconds

        const key = `rate:submit:${userId}`;

        //incement the count
        const requestCount = await redisClient.incr(key);

        if(requestCount === 1){
            await redisClient.expire(key, WINDOW);
    }
    //if limit exceeded

    if(requestCount > LIMIT){
        return res.status(429).json({ message: 'Too many requests' });

    }
    next();
}catch(err){
    return res.status(500).json({ message: 'Internal Server Error' });

}
};

module.exports = { rateLimit };