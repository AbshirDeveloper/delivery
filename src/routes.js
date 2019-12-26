const writeToFiles = require("./writeToFiles");
const fileReader = require("./readFromFiles");
const jwt = require("./token");

const registerUser = (req, res) => {
  const responseFromWriting = writeToFiles.writeToAllowedUsers(req.body);
  if (responseFromWriting === "success") {
    res.sendStatus(200);
  } else {
    res.send(400, {
      error: responseFromWriting
    });
  }
};

const getAllUsers = (req, res) => {
  const userId = jwt.getUserIdFromToken(req.headers.token);
  const data = fileReader.reader("allowedUsers", "users", userId);
  res.send(data);
};

const getViewLayoutData = (req, res) => {
  const userId = jwt.getUserIdFromToken(req.headers.token);
  if (req.query.viewName) {
    const data = fileReader.reader("data", req.query.viewName, userId);
    res.send(data);
  } else {
    res.sendStatus(400, {
      error: "no view name provided"
    });
  }
};

module.exports = { registerUser, getAllUsers, getViewLayoutData };
