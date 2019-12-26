const fs = require("fs");

const isUserEntitled = (data, userId) => {
  if (data.entitledIds.includes(userId)) {
    return true;
  } else {
    return false;
  }
};

const reader = (file, innerObject, userId) => {
  const data = JSON.parse(fs.readFileSync(`./json/${file}.json`))[innerObject];
  if (isUserEntitled(data, userId)) {
    return data;
  } else {
    return false;
  }
};

const getUserId = email => {
  const users = JSON.parse(fs.readFileSync("./json/allowedUsers.json")).users;
  return users.filter(user => user.email === email)[0].id;
};

module.exports = { reader, getUserId };
