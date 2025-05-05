const { Router } = require("express");
const mainProcess = Router();
const upload = require('../../middlewares/upload.middleware')

const {
  uploadFile,
  getFiles,
  downloadFile,
} = require("../../controllers/main");

mainProcess.post("/", upload.array("document", 10), uploadFile);
mainProcess.get("/", getFiles);
mainProcess.get("/download/:file", downloadFile);

module.exports = mainProcess;
