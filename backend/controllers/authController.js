const User = require('../models/user');
const Joi = require('joi');
const CustomErrorHandler = require('../services/CustomErrorHandler')
const JwtService = require('../services/JwtService');

const authController = {
  async register(req, res, next){
      try{
          const userSchema = Joi.object({
              Fullname: Joi.string().min(3).max(30).required(),
              Email: Joi.string().email().required(),
              Password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
          });

          const { error } = userSchema.validate(req.body);

          if(error){
              return next(error);
          }

          const exist = await User.findOne({ Email: req.body.Email });

          if(exist){
              return next(CustomErrorHandler.alreadyExist());
          }

          const user = await User.create(req.body);

          JwtService.sendToken(201, user, res);
          
      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async login(req, res, next){
      try{
          const loginSchema = Joi.object({
              Email: Joi.string().email().required(),
              Password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
          });

          const { error } = loginSchema.validate(req.body);

          if(error){
              return next(error);
          }

          const user = await User.findOne({ Email: req.body.Email });

          if(!user){
              return next(CustomErrorHandler.notFound());
          }

          const match = await user.comparePassword(req.body.Password);

          if(!match){
              return next(CustomErrorHandler.wrongCredentials());
          }

          JwtService.sendToken(200, user, res);

      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async logout(req, res, next){
      try{
          const options = {
              expire: new Date(
                  Date.now()
              ),
              httpOnly: true
          }

          res.cookie('token', null, options).json({
              success: true,
              message: 'Logout successful'
          });
      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async updateProfile(req, res, next){
      try{
          const updateSchema = Joi.object({
            Fullname: Joi.string().min(3).max(30),
            Email: Joi.string().email()
          }).unknown(true);

          const { error } = updateSchema.validate(req.body);

          if(error){
              return next(error);
          }

          const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });

          if(!user){
              return next(CustomErrorHandler.dbError());
          }

          JwtService.sendToken(200, user, res);

      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async destroyAccount(req, res, next){
      try{
          const user = await User.findOne({ _id: req.user._id });

          if(!user){
              return next(CustomErrorHandler.unAuthorized('Login first to access this resource'));
          }

          const match = await user.comparePassword(req.body.Password);

          if(!match){
              return next(CustomErrorHandler.wrongCredentials('Password is incorrect'));
          }

          await user.remove();

          const options = {
            expire: new Date(
                Date.now()
            ),
            httpOnly: true
         }

        res.cookie('token', null, options).json({
            success: true,
            message: 'Account deleted successful'
        });
      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async updatePassword(req, res, next){
      try{
          const user = await User.findOne({ _id: req.user._id });

          const match = await user.comparePassword(req.body.oldPassword);

          if(!match){
              return next(CustomErrorHandler.wrongCredentials('Password entered is incorrect'));
          }

          user.Password = req.body.newPassword;

          await user.save();

          JwtService.sendToken(201, user, res);

      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async ShowMyProfile(req, res, next){
      try{
          const user = await User.findOne({ _id: req.user._id }).select('-Password -createdAt -updatedAt -__v');

          if(!user){
              return next(CustomErrorHandler.unAuthorized('Login first to access this resource'));
          }

          res.status(200).json({
              success: true,
              user
          });
      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  },

  async forgotPassword(req, res, next){
      try{
          const user = await User.findOne({ Email: req.body.Email });

          if(!user){
              return next(CustomErrorHandler.notFound());
          }

          

      }catch(err){
          return next(new Error(`Something went wrong: ${err.message}`));
      }
  }
};

module.exports = authController;