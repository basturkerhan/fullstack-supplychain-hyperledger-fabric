const authenticateHelper = require('../helpers/authenticate');
const customResponse = require("../helpers/customResponse");

module.exports = async (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return customResponse.badRequest(res, "Required access token");
    }
    try {
        const result = await authenticateHelper.certifyAccessToken(accessToken);
        req.body.loggedUserId = result.id;
        req.body.loggedUserType = result.role;
        req.body.loggedUserOrganization = result.organization;
        return next();
    } catch (err) {
        return customResponse.badRequest(res, err.toString());
    }
};
