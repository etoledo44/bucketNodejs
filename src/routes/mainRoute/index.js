const { Router } = require("express");
const mainProcess = Router();
const upload = require("../../config/multer");
const { uploadFile, getFiles, downloadFile } = require("../../controllers/main/index");

mainProcess.get("/", getFiles);
mainProcess.post("/", upload.array("document", 10), uploadFile);
mainProcess.get("/download/:file" , downloadFile);

module.exports = mainProcess;
