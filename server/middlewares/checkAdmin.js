const customResponse = require("../helpers/customResponse");

module.exports = async (req, res, next) => {
    const {loggedUserType} = req.body;

    if (!loggedUserType) {
        return customResponse.badRequest(res, 'Unauthorised user');
    }

    try {
        if( loggedUserType === 'admin') {
            return next();
        }
        return customResponse.badRequest(res, "User type admin required");
    } catch (err) {
        return customResponse.badRequest(res, err.toString());
    }
};
