const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");

const auth = (req, res, next) => {
    try{
        // console.log(req.cookies);
        if(!req.cookies){
           return next(CustomErrorHandler.unAuthorized('Token not found in cookie'));
        }

        const { token } = req.cookies;

        if(!token){
            return next(CustomErrorHandler.JwtError('Error with token'));
        }

        if(token === 'j:null'){
            return next(CustomErrorHandler.unAuthorized('Token has been expired'));
        }

        const { _id, Fullname, role } = JwtService.verify(token, process.env.JWT_SECRET);

        const user = {
            _id,
            Fullname,
            role
        }
        req.user = user;
        
        next();
    }catch(err){
        return next(new Error(`Something went wrong: ${err.message}`));
    }
}

module.exports = auth;