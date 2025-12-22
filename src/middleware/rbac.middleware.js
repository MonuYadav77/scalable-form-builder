
const authorize = (...allowedRoles) => {
    return (req,res,next) =>{
        if(allowedRoles.includes(eq.user.role)){
            return res.status(403).json({message: "Acess Denied"});
        }
        next();
    };
};

module.exports = authorize;