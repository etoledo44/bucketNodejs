const { Router } = require("express");
const _login = Router();
const { login } = require("../../controllers/login");

_login.post("/login", login);

module.exports = _login;
