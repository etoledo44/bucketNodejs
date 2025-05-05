const CONSTANTS = require("../../config/constants");
const { mkdir, access, constants } = require("fs").promises;
const path = require("path");

async function isFolderExist(folderName) {
  const pathFile = path.join(CONSTANTS.uploadDir, folderName);
  try {
    await access(pathFile, constants.F_OK);
    console.log("pasta ja criada");
    return true;
  } catch (error) {
    console.log("pasta não existe");
    console.log("vai criar pasta");

    await createFolder(pathFile);
    console.log("pasta criada");
    return true;
  }
}
async function createFolder(pathFile) {
  console.log("criando pasta");
  try {
    await mkdir(pathFile, { recursive: true });
  } catch (error) {
    return new Error(error);
  }
}

module.exports = {
  isFolderExist,
};
