const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth')

router.post('/login', function (req, res) {
  console.log("POST '/login'")
  let authServiceObj = new AuthService(req, res)
  authServiceObj.login();
})

router.get('/profile', function(req, res) {
  console.log("GET '/profile'")
  let authServiceObj = new AuthService(req, res)
  authServiceObj.getMe()
})

module.exports = router;