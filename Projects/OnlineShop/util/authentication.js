// Extracting Session UID from stored session saved during signup
function createUserSession(req,user,action){
    // requesting saved session uid from db and exporting it as string
    req.session.uid = user._id.toString();
// running express-session save() method to save action when session was successful stored
    req.session.save(action);
}

function destroyUserAuthSession(req){
    req.session.uid = null;
}

module.exports = {
    createusersession : createUserSession,
    destroyuserauthsession : destroyUserAuthSession
};