const jwt = require('jsonwebtoken');
const config = require('config');

const authNormal = async (req, res, next) => {
  try {
    let token = req.headers('x-auth-token');

    if (!token) {
      return next();
    }

    jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if (err) {
        console.log(`JSONWebToken Error: ${err}`);
        return next();
      }

      if (!decoded || !decoded.id) {
        return next();
      }

      req.user = {
        id: decoded.id
      };

      return next();
    });
  } catch (error) {
    console.log(`Some problem in auth middleware: ${error}`);
    return next();
  }
};

module.exports = { authNormal };
