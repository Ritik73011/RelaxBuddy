const jwt = require('jsonwebtoken');

const VerifyUser = async(req,res,next)=>{
    if(req.headers['token']===undefined)
    return res.status(400).send({
        message:"access denied! user not verified..."
    })

    const token = req.headers['token'];

    try {
        const decodeToken =  jwt.verify(token,process.env.PRIVATE_KEY);
        req.user_id = decodeToken.user_id;
        req.name = decodeToken.name;
        req.email = decodeToken.email;
        req.premium = decodeToken.premium;

        return next();
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        });
    }
}
const getUserId = async(req,res,next)=>{
    if(req.headers['token']===undefined)
    return res.status(400).send({
        message:"access denied! user not verified..."
    })
    const token = req.headers['token'];
    try {
        const decodeToken =  jwt.verify(token,process.env.PRIVATE_KEY);
        req.user_id = decodeToken.user_id;
        return next();
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        });
    }
}
module.exports = {VerifyUser,getUserId};