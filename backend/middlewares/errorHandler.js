const CustomErrorHandler = require('../services/CustomErrorHandler');
const {ValidationError} = require('joi');

const errorHandler = (err, req, res, next) => {
    try{
        let statusCode = 500;
        let data = {
            message : 'Internal server error',
            originalError: err.message
        }

        if(err instanceof CustomErrorHandler){
            statusCode = err.status;
            data = {
                message: err.msg
            }
        }

        if(err instanceof ValidationError){
            statusCode = 421;
            data = {
                message: err.message
            }
        }

        res.status(statusCode).json(data);
        
    }catch(err){
        return next(new Error(`Something went wrong: ${err.message}`))
    }
}

module.exports = errorHandler;