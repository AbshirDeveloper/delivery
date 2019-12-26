const fs = require("fs");
const jwt = require("./token");

const users = JSON.parse(fs.readFileSync("./json/allowedUsers.json")).users;

const validateUser = userInfo => {
  const { email, password } = userInfo;
  const userFound = users.filter(
    user => user.email === email && user.password === password
  );
  console.log(users);
  if (userFound.length) {
    const token = jwt.createToken(userInfo);
    const refreshToken = jwt.createRefreshToken(userInfo);
    const { password, ...rest } = userFound[0];
    return {
      token,
      refreshToken,
      ...rest
    };
  } else {
    return false;
  }
};

module.exports = {
  validateUser
};
