import multer from 'multer';
import path from 'path';
import { TMP_DIR } from '../config/index';
import { ensureDir } from '../utils/file.utils';

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
        path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage });

export default upload;
