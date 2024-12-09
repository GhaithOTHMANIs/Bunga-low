const express = require("express");
const dotenv = require("dotenv");
const AuthService = require("../middlewares/authentification.js");
const bungalowController = require("../controllers/bungalowController.js");

const route = express.Router();

route.get(
  "/all",
  AuthService.authenticateToken,
  bungalowController.getAllBungalows
);

route.get(
  "/add",
  AuthService.authenticateToken,
  bungalowController.addBungalowPage
);

route.post(
  "/add",
  AuthService.authenticateToken,
  bungalowController.addBungalow
);

route.get(
  "/edit/:id",
  AuthService.authenticateToken,
  bungalowController.editBungalowPage
);

route.post(
  "/edit/:id",
  AuthService.authenticateToken,
  bungalowController.editBungalow
);

route.get(
  "/:id",
  AuthService.authenticateToken,
  bungalowController.getBungalowDetails
);

route.delete(
  "/:id",
  AuthService.authenticateToken,
  bungalowController.deleteBungalow
);

route.post(
  "/:id/geo",
  AuthService.authenticateToken,
  bungalowController.locateBungalow
);

route.get("/api/all", bungalowController.getAllBungalowsAPI);
/*
route.get(
  "/api/:id",
  AuthService.authenticateToken,
  bungalowController.getAllBungalows
);
*/

route.get("/api/search", bungalowController.searchBungalow);

route.get("/:id/api/geo", bungalowController.locateBungalow);

module.exports = route;
