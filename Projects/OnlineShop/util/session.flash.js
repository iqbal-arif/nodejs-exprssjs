
// Get Session Data
function getSessionData(req){
    const sessionData = req.session.flashedData;

    req.session.flashedData = null;

    return sessionData;
}

// Flash Session Data
function flashDataSession(req,data,action){
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports ={
    getsessiondata : getSessionData,
    flashdatasession : flashDataSession
};