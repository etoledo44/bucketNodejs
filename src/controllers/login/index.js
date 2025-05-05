const { generateToken } = require("../../jwt/index");
async function login(req, res) {
  console.time("login");
  const user = req.body;
  const userMock = {
    id: 1,
    name: "eriq",
    password: "45646546",
  };

  const payload = { id: userMock.id, userName: userMock.name };
  const jwt = generateToken(payload);

  console.timeEnd("login");
  return res.status(200).json(jwt);
}

module.exports = {
  login,
};
