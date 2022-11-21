function addCsrfToken(req,res,next){

// Express .locals property that allows to add variable custom key value to all views as token.
// csrf uses csrfToken() method for that.
// req.csrfToken(); generates token  save it in res.locals.csrfToken and that is available in all views
    res.locals.csrfToken = req.csrfToken();
    next();  // use to call next handler in line 
}

module.exports = addCsrfToken;