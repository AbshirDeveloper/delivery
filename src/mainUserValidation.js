const userValidation = require("./userValidation");
const jwt = require("./token");

const mainValidation = (req, res, next) => {
  if (req.headers.refreshtoken) {
    const respones = jwt.validateRefreshToken(req.headers.refreshtoken);
    if (respones !== "invalid token") {
      const userInfo = {
        email: respones.email,
        password: respones.password
      };
      const token = userValidation.validateUser(userInfo);
      res.send({
        token
      });
    } else {
      res.sendStatus(401);
    }
  } else if (req.body.userInfo) {
    const token = userValidation.validateUser(req.body.userInfo);
    if (token) {
      res.send({
        token
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    const authorized = jwt.validateToken(req.headers.token);
    if (authorized) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
};

module.exports = { mainValidation };
