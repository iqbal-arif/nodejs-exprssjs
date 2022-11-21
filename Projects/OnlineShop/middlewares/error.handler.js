
function handlerErrors(error,req,res,next){

    console.log(error);
    // Render an error page
    res.status(500).render("shared/500");
}

// Exporting Error Handle
module.exports = handlerErrors;