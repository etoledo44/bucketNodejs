require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

const express = require("express");
const bodyParser = require("body-parser");
const CONSTANTS = require("./config/constants");

const { expressjwt } = require("express-jwt");
const { generateToken } = require("./jwt");
const routes = require("./routes");

const app = express();

// Configura o middleware para servir arquivos estáticos
app.use("/visualizar", express.static(CONSTANTS.uploadDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
// app.use(
//   expressjwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//   }).unless({ path: ["/login"] })
// );

// Inicia o servidor na porta definida no arquivo .env
const PORT = process.env.PORT || 5050;
app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta: ${PORT}`);
});
