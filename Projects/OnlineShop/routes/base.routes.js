// Importing EXPRESS Package
const express = require('express');

// // Importing getSingUp function and assigning to authController
// const authController = require('../controllers/auth.controller');

// Setting Express Router object by calling router()
const router = express.Router();

// Configure Router

// Router Object Methods for Registering Routes
//  GET, POST, PATCH, DELETE METHODS
// Get Method 
// Get Method takes MIDDLEWAERE FUNCTIONS (Handler) as an arguments after PATH definition
// It takes FINAL Middleware function (authController.getSignup) that send back a response

// Route For Signup Page
router.get('/', function(req, res){
    res.redirect("/products");
});

// Export Router
module.exports = router;