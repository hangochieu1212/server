const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');
const authToken = require('../app/jwt/auth');
//const checkAdmin = require('../app/middleware/permission')
router.get('/show',authToken,accountController.show)
router.post('/register',accountController.register);
router.post('/login',accountController.login);
router.put('/:id', accountController.updateAccount);
router.delete('/:id',accountController.destroyAccount);
//router.post('/checkAdmin',accountController.checkAdmin);

module.exports = router;