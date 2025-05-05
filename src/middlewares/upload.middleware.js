const multer = require("multer");
const path = require("path");
const { TMP_DIR } = require("../config");
const { ensureDir } = require("../utils/file.utils");

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureDir(TMP_DIR);
    cb(null, TMP_DIR);
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
