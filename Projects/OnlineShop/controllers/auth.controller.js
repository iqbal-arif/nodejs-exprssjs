// Importing User Class
const User = require("../models/user.model");

// Importing Stored Session UID from UTIL folder
const authUtil = require("../util/authentication");

// Importing User Credentials Valid Function
const validation = require("../util/validation");

// Importing Flash Session Util Function
const sessionFlash = require("../util/session.flash");

// GETSIGNUP Function
function getSignUp(req,res){

    let sessionData = sessionFlash.getsessiondata(req);
    if (!sessionData){
        sessionData={
            email:"",
            confirmEmail:"",
            password:"",
            fullname:"",
            street:"",
            postal:"",
            city:"",
        }
    }
    res.render("customer/auth/signup",{ inputData: sessionData}); //the top level view folder is mentioned in app.js
}

//  SINGUP Function, when user signs up
async function signUp(req, res, next){

    const enteredData = {
        email:req.body.email,
        confirmEmail:req.body["confirm-email"],
        password:req.body.password,
        fullname:req.body.fullname,
        street:req.body.street,
        postal:req.body.postal,
        city:req.body.code
    };

 // Validating User Info before submission
    // req.body["confirm-email"] . JS does not allow "-" between names, so user square bracket 
    if (!validation.userdetailsarevalid(req.body.email,req.body.password,req.body.fullname,req.body.street,req.body.postal,req.body.city)|| !validation.emailisconfirmed(req.body.email, req.body["confirm-email"])){
        // Flashing Session Data
        sessionFlash.flashdatasession(req,{
            errorMessage: "Please check your input. Password must be at least 6 characters long, postal code must be 5 characters long.",
            ...enteredData,
        }, function(){
            res.redirect('/signup');
        });
        return;
    }

    // Invoking User Class to construct userID
    // req.body. are available through urlencoded() middleware used in app.js
    const user =new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city,
    ) ;

   

    try {
        // Check existing User in db
        const existsAlready = await user.existsAlready();
        if (existsAlready){
            // Flashing Session Data
            sessionFlash.flashdatasession(req,{
                errorMessage: "User exists already! Try logging in instead!",
                ...enteredData
            }, function(){
                res.redirect('/signup');
            });
            return;
        }
        // Calling signup method in user.models.js with user info from static form and 
        await user.signup();
        
    } catch (error) {
        next(error);
        return;
    }

    // Redirecting user to Login page after call signup data and submitting it to db
    res.redirect("/login");
}

// GETLOGIN Function
function getLogIn(req,res){
    let sessionData = sessionFlash.getsessiondata(req);
    if (!sessionData){
        sessionData={
            email:"",
            password:"",
        }
    }
    // To render login page
    res.render("customer/auth/login", {inputData:sessionData});
}  

// User Login Method
async function logIn(req,res){
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData ={
        errorMessage: "Invalid Credentials - Please Double-Check your Email and Password!",
        email:user.email,
        password: user.password
    }
    if (!existingUser){
        // Flashing Session Data
        sessionFlash.flashdatasession(req,sessionErrorData, function(){
            res.redirect('/login');
        });
        return;
    }

    // Checking if password is correct by sending existingUser.password from db to hasMatchingPassword function to match it
    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if (!passwordIsCorrect){
       // Flashing Session Data
       sessionFlash.flashdatasession(req,sessionErrorData, function(){
        res.redirect('/login');
    });
    return;
    }
    // Redirect User to starting page when exitingUser from db login successfully, and anonymous function that will execute when session was saved.
    authUtil.createusersession(req,existingUser, function(){
        res.redirect("/");
    });
}

// Function that will remove some login session data logout
function logOut(req,res){
    authUtil.destroyuserauthsession(req);
    res.redirect ("/login");
}

// Exporting Function as a Object key & value 
module.exports ={
    getsignup: getSignUp,
    getlogin: getLogIn,
    signup:signUp,
    login:logIn,
    logout : logOut
};