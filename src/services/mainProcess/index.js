const { access, constants } = require("fs").promises;
const path = require("path");
const CONSTANTS = require("../../config/constants");

async function checkAcessFiles(fileName) {
  console.log("acessou checkAcessFiles");
  const filePath = path.join(CONSTANTS.uploadDir, fileName);
  await access(filePath, constants.F_OK | constants.R_OK);
}

module.exports = {
  checkAcessFiles,
};
