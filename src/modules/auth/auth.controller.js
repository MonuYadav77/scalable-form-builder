const authservice = require('./auth.service.js');

//register controller

const register = async (req,res,next) =>{
    try{
        const user = await authservice.register(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        })
    }
    catch(err){
        console.error('Error in register controller:', err);
        next(err);
    }
}

const login = async(req,res,next) =>{
    try{
        const result = await authservice.loginUser(req.body);
        res.status(200).json(result);

    }
    catch(err){
        console.error('Error in login controller:', err);
        next(err);
    }
}

module.exports = {register, login}; 