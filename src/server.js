const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const validation = require("./mainUserValidation");
const routes = require("./routes");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const { mainValidation } = validation;
const { registerUser, getAllUsers, getViewLayoutData } = routes;

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(mainValidation);

app.post("/registerUser", registerUser);

app.get("/getAllUsers", getAllUsers);

app.get("/viewLayout", getViewLayoutData);

app.listen(3001);
