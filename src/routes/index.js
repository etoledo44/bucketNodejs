const { Router } = require("express");
const routes = Router();
const mainProcess = require("../routes/mainRoute");
const _login = require("../routes/login");

routes.use(_login);
routes.use(mainProcess);

module.exports = routes;
