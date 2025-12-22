
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./user.model');

//register function 

const register = async (data)=>{
    const existinguser = await User.findOne({email:data.email});
    if(existinguser){
        throw new Error ('User is already registered with this email');

    }
    //password hashing
    const hashedPassword = await bcrypt.hash(data.password,10);

    //if no existing user create new user
    const user = await User.create({
        ...data,
        password:hashedPassword

    });
    return user;
};

//login function 
const loginUser = async(email,password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error ('Invalid credentials');
    }

    //password comparison
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Invalid credentials');
    }

    let data = {
        userId : user._id,
        role: user.role
    }
    let jwtscretkey = process.env.JWT_SECRET_KEY;

    //create token 
    const token = jwt.sign(data, jwtscretkey, { expiresIn: '1h' });

    return {token};
};

module.exports = {register, loginUser};