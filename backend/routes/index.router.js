const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userauthprofile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/forgot-password', ctrlUser.ForgotPassword);
router.post('/reset-password', ctrlUser.ResetPassword);
router.post('/change-password', ctrlUser.ChangePasswordSettings);
router.get('/userprofile', ctrlUser.userProfile);
router.post('/updateTheme',ctrlUser.updateTheme);
router.post('/askAndGetBlog',ctrlUser.askAndGetBlog);
router.post('/delete-account', ctrlUser.deleteAccount);
router.post('/hide-blog', ctrlUser.hideBlog);
router.post('/show-blog', ctrlUser.showBlog);

module.exports = router;