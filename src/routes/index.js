const { Router } = require("express");
const routes = Router();
const mainProcess = require("../routes/mainRoute");

routes.use(mainProcess);

module.exports = routes;
