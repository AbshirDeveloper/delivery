const jwt = require("jsonwebtoken");
const readFromFiles = require("./readFromFiles");

const createToken = info => {
  return jwt.sign(info, "real", { expiresIn: "1hr" });
};

const createRefreshToken = info => {
  return jwt.sign(info, "refresh", { expiresIn: "1d" });
};

const validateRefreshToken = token => {
  return jwt.verify(token, "refresh", function(err, decoded) {
    if (err) {
      return "invalid token";
    } else return decoded;
  });
};

const validateToken = token => {
  return jwt.verify(token, "real", function(err, decoded) {
    if (err) {
      return false;
    }
    return decoded;
  });
};

const getUserIdFromToken = token => {
  return jwt.verify(token, "real", function(err, decoded) {
    if (err) {
      return false;
    }
    const userId = readFromFiles.getUserId(decoded.email);
    return userId;
  });
};

module.exports = {
  createToken,
  createRefreshToken,
  validateToken,
  validateRefreshToken,
  getUserIdFromToken
};
