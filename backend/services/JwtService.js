const Jwt = require('jsonwebtoken');
const CustomErrorHandler = require('./CustomErrorHandler');

class JwtService{
    static sign(payload, expiry, secret){
        return Jwt.sign(payload, secret , { expiresIn: expiry })
    }

    static verify(token, secret){
        return Jwt.verify(token, secret);
    }

    static sendToken(statusCode, user, res){
        try{
            const token = this.sign({ Fullname: user.Fullname, _id: user._id, role: user.role }, process.env.JWT_EXPIRY, process.env.JWT_SECRET);

            if(!token){
                return next(CustomErrorHandler.JwtError());
            }

            const options = {
            expire: new Date(
                Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
            }

            res.status(statusCode).cookie('token', token, options).json({
                success: true,
                token,
                user
            })
        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`));
        }
    }
}

module.exports = JwtService;