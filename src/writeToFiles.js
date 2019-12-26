const fs = require("fs");

const writeToFile = (
  info,
  fileName,
  innerObject,
  callback,
  checkIfItExists
) => {
  let jsObject = JSON.parse(fs.readFileSync(`./json/${fileName}.json`))[
    innerObject
  ];

  const exists = jsObject.some(callback);
  if (checkIfItExists && !userExists) {
    jsObject.push({
      ...userInfo
    });
    const newObj = {
      users: jsObject
    };
    fs.writeFileSync("./allowedUsers.json", JSON.stringify(newObj));
    return true;
  } else {
    return false;
  }
};

const writeToAllowedUsers = userInfo => {
  const res = writeToFile(
    userInfo,
    "allowedUsers",
    "users",
    user => user.email === userInfo.email,
    true
  );
  return res;
};

module.exports = { writeToAllowedUsers };
