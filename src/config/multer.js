const multer = require("multer");
const fs = require("fs");
const path = require("path");
const CONSTANTS = require("./constants");
const { isFolderExist } = require("../services/filesystem");
const { convertImage } = require("./sharp");
// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Cria o diretório de upload se não existir
    await isFolderExist("sadasdasd");
    if (!fs.existsSync(CONSTANTS.uploadDir)) {
      fs.mkdirSync(CONSTANTS.uploadDir, { recursive: true });
    }
    await convertImage(file);
    // Se o arquivo for uma imagem .webp, salva no diretório de imagens
    if (path.extname(file.originalname) == ".webp") {
      if (!fs.existsSync(CONSTANTS.uploadDirImages)) {
        fs.mkdirSync(CONSTANTS.uploadDirImages, { recursive: true });
      }
      cb(null, CONSTANTS.uploadDirImages);
    } else {
      cb(null, CONSTANTS.uploadDir);
    }
  },
  filename: (req, file, cb) => {
    // Gera um nome único para o arquivo
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
