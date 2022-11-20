// Importing Node Core Module Path
const path = require("path");

// Importing EXPRESS Package
const express = require('express');

// Importing CSRF Package
const csrf = require("csurf");
/**************************************************************************************/
// Importing Express Session Package
const expressSession = require("express-session");

// Importing Session Config middleware
const createSessionConfig = require('./config/session');
/************************************************************************************** */


// Importing database Object 
const db = require("./data/database");

// Importing CSRF Middleware
const addCsrfTokenMiddleware = require("./middlewares/csrf.token");

// Importing Error Handler Middleware
const errorHandlerMiddleware = require("./middlewares/error.handler")
/*************************************************************************** */
// Importing Login Authentication Status Middleware
const checkAuthStatusMiddleware = require("./middlewares/check.auth");

// Importing AuthRoutes 
const authRoutes = require("./routes/auth.routes");
// const exp = require("constants"); **********************Check if you get any error***********

// Importing Products and Base Routes
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

// Setting express object.
const app = express();

//Register EJS Package with express to render view
app.set("view engine", "ejs");

//Register Path for EJS with express to locate views files.
app.set("views", path.join(__dirname, "views"));

// Defining ExpressJS built-in middleware to serve Static pages to public 
app.use(express.static('public'));// mention public or any folder that contains the static pages in the parenthesis.

// To encoded data from database use express.urlencoded middleware as such. This data is coming when form is submitted.
app.use(express.urlencoded({extended:false}));
/*************************************************************************************** */
// Invoking Session Config function
const sessionConfig = createSessionConfig();

// Activating Express-Session with Session Config argument
app.use(expressSession(sessionConfig));
/*************************************************************************************** */

//  CSRF TOKEN MIDDLEWARE
// The 3rd party middleware "csurf" helps generate the token + checks incoming tokens for validity.
// Custom middleware distributes generated tokens for all other middleware, route handler fn, & views.

// Activate CSURF as a Middleware
// app.use(csrf());
app.use(csrf());

// Calling custom Middleware
app.use(addCsrfTokenMiddleware);

//  Calling Authentication Middleware
app.use(checkAuthStatusMiddleware);

// Calling custom Middleware
app.use(baseRoutes);

// Registering with app.use() method to evaluate incoming request.
app.use(authRoutes);

// Calling custom Middleware
app.use(productsRoutes);

// Calling Error Handler Middleware
app.use(errorHandlerMiddleware);

// Calling database connection
db.connecttodatabase().then(function(){
        // Listening to PORT 3000
       app.listen(3000);
    }).catch(function (error){
        console.log("Failed to connect to the database");
        console.log(error);
    });


