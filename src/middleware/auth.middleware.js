const jwt = require ('jsonwebtoken');

const authMiddleware = (req,res,next)=>{ 
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Authorization header missing'});
    }

    const token = autheHeader.split(' ')[1]; // spplit by space so we get the token part

    try{
        const decorded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decorded; //{userId,role}
        next();

    }
    catch(err){
        return res.status(401).json({message: "Invalid Token"});
    }
};

module.exports = authMiddleware;