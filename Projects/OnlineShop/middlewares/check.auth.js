
function checkAuthStatus(req,res,next){
    // Retrieve session Id that was store in db during login session
    const uid = req.session.uid;

    if(!uid){
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();


}

module.exports =  checkAuthStatus;


