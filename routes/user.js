const express = require("express");
const router = express.Router();
const {handleSignUp,handleLogin} = require("../controllers/user");

//Signing in
router.post('/login',handleLogin);

//Creating a new user
router.post('/register',handleSignUp);

module.exports = router;