class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.msg = msg;
    }

    static dbError(message='Error in database'){
        return new CustomErrorHandler(502, message);
    }

    static alreadyExist(message='User already exist'){
        return new CustomErrorHandler(422, message);
    }

    static JwtError(message='Error while signing token'){
        return new CustomErrorHandler(421, message);
    }

    static notFound(message='No user with that email'){
        return new CustomErrorHandler(404, message);
    }

    static wrongCredentials(message='Email or password are incorrect'){
        return new CustomErrorHandler(422, message);
    }

    static unAuthorized(message='UnAuthorized access'){
        return new CustomErrorHandler(422, message);
    }

    static serverError(message='Internal server error'){
        return new CustomErrorHandler(501, message);
    }
}

module.exports = CustomErrorHandler;