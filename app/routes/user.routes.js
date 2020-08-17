var express = require('express')
const router = express.Router();
expressValidator = require('express-validator')
var userController =require('../controller/user.controller')
router.use(expressValidator())

router.post('/',userController.createUser);
//router.post('/verify',userController.confirmAccount);
router.post('/confirmAccount',userController.verifyAccount);
router.post('/login',userController.login);


module.exports = router