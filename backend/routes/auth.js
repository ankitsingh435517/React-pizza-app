const router = require('express').Router();
const  authController  = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/user/register/new', authController.register);

router.post('/user/login', authController.login);

router.post('/user/logout', auth, authController.logout);

router.put('/user/update', auth, authController.updateProfile);

router.delete('/user/delete', auth, authController.destroyAccount);

router.put('/user/update-password', auth, authController.updatePassword);

router.get('/user/me', auth, authController.ShowMyProfile);

router.post('/user/forgot-password', auth, authController.forgotPassword);

module.exports = router;