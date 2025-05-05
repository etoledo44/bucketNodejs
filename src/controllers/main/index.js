const { checkAcessFiles } = require("../../services/mainProcess");
const CONSTANTS = require("../../config/constants");
const fs = require("fs");
const path = require("path");
const { UPLOAD_DIR, TMP_DIR } = require("../../config");
const { processFile } = require("../../services/file.service");

// Rota para upload de arquivos
async function uploadFile(req, res) {
  console.time("/ post");

  console.log("+++ UploadDIr", UPLOAD_DIR);
  console.log("+++ TMP_DIR", TMP_DIR);

  const { cnpj } = JSON.parse(req.body.data);
  console.log("cnpj", cnpj);

  const files = req.files;

  if (!files) {
    console.timeEnd("/ post");
    return res.status(500).json({ error: "Não possui arquivo anexado!" });
  }

  try {
    const results = await processFile(cnpj, files);
    console.timeEnd("/ post");
    res.json(results);
  } catch (error) {
    console.timeEnd("/ post");
    return res.status(500).json({ error: error.message });
  }

  // console.timeEnd("/ post");
  // return res.status(200).json({ filesArr });
}

// Rota para listar arquivos disponíveis
async function getFiles(req, res) {
  console.time("/ get");
  try {
    const file = fs.readdirSync(CONSTANTS.uploadDir, { recursive: true });
    if (!file) {
      console.timeEnd("/ get");
      return res.status(404).send("Arquivo não encontrado!");
    }
    console.timeEnd("/ get");
    return res.status(200).json(file);
  } catch (error) {
    console.timeEnd("/ get");
    return res.status(500).json({ error: true });
  }
}

// Rota para download de arquivos
async function downloadFile(req, res) {
  console.time("/download");

  try {
    const fileName = req.params.file;
    const filePath = path.join(CONSTANTS.uploadDir, req.params.file);

    await checkAcessFiles(req.params.file);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.timeEnd("/download");
        console.error(err);
        if (!res.headersSent) {
          console.timeEnd("/download");
          return res
            .status(500)
            .send("Erro ao realizar o download do arquivo.");
        }
      }
    });
  } catch (error) {
    console.timeEnd("/download");
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFiles,
  uploadFile,
  downloadFile,
};
