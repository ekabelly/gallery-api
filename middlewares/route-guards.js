const tokenManager = require('../util/token-manager');
const usersConstants = require('../constants/user-constants');
const userConfig = requireConfigByEnv('user-config.json5');
const logger = require('../util/log-manager');
const errorCodes = require('../constants/error-codes');

module.exports.teacherRoutesGuard = function (req, res, next) {
  return commonRoutesGuard(usersConstants.userTypes.USER_TYPE_TEACHER, req, res, next);
};

module.exports.studentRoutesGuard = function (req, res, next) {
  return commonRoutesGuard(usersConstants.userTypes.USER_TYPE_STUDENT, req, res, next);
};

module.exports.adminRouteGuard = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  try {
    let decodedToken = tokenManager.verifyToken(token);
    if (decodedToken.userEtz !== userConfig.adminEtz) {
      // if the user is not the sysAdmin, request denied.
      logger.debug('User is not an admin');
      return res.status(200).send({ success: false, message: errorCodes.USER_NOT_ADMIN });
    }
    return next();
  } catch (err) {
    logger.debug('Error verifying token: ' + err);
    return res.status(200).send({
      success: false,
      message: (err.name === 'TokenExpiredError' ? errorCodes.TOKEN_EXPIRED_ERROR : 'Token verification failure ')
    });
  }
};

function commonRoutesGuard (userType, req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      let decodedToken = tokenManager.verifyToken(token);
      if (decodedToken.userType === userType) {
        req.decodedToken = decodedToken;
        next();
      } else {
        logger.debug('Inappropriate user type');
        return res.status(401).send({
          success: false,
          message: 'Request not allowed '
        });
      }
    } catch (err) {
      logger.debug('Error verifying token: ' + err);
      return res.status(200).send({
        success: false,
        message: (err.name === 'TokenExpiredError' ? errorCodes.TOKEN_EXPIRED_ERROR : 'Token verification failure ')
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      message: 'No token provided.'
    });
  }
}
