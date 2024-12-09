const express = require("express");
const authController = require("../controllers/authController.js");

const port = 3000;

const route = express.Router();

route.get("/", (req, res) => {
  res.redirect(`http://localhost:${port}/login`);
});

route.get("/login", authController.getLoginPageAgent);

route.post("/login", authController.loginAgent);

route.post("/logout", authController.logoutAgent);

route.post("/api/signup", authController.signup);

route.post("/api/login", authController.login);

route.post("/api/logout", authController.logout);

module.exports = route;
