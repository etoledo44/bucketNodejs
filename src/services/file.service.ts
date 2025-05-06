import path from 'path';
import { unlink, rename } from 'fs/promises';
import sharp from 'sharp';
import { UPLOAD_DIR, TMP_DIR } from '../config';
import { ensureDir } from '../utils/file.utils';
import { randomUUID } from 'crypto';

async function processFile(cnpj: string, files: Express.Multer.File[]) {
  console.log('+++ processFile', cnpj);

  const destDir = path.join(UPLOAD_DIR, cnpj);
  await ensureDir(destDir);

  const results = [];

  for (const file of files) {
    console.log('+++ file', file.originalname);
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(`${randomUUID()}-${file.originalname}`, ext);
    let finalName;

    try {
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        console.log('+++ convert to webp');
        finalName = `${baseName}.webp`;
        await sharp(file.path)
          .webp({ quality: 30, lossless: false })
          .toFile(path.join(destDir, finalName));
      } else {
        finalName = file.filename;
        await rename(file.path, path.join(destDir, finalName));
      }

      // urlPath = `/files/${cnpj}/${finalName}`;
      results.push({ original: file.originalname });
    } finally {
      // Garante que o tmp será limpo mesmo que ocorra erro
      console.log('+++ unlink', file.path);
      await unlink(file.path);
    }
  }

  // deleteFile(files);
  return results;
}

// function deleteFile(files) {
//   console.log("+++ deleteFile", files[0].originalname);
//   const destDir = TMP_DIR;
//   console.log("+++ deleteFile path", path.join(TMP_DIR, files[0].originalname));

//   for (const file of files) {
//     console.log("*** file", path.join(destDir, file.originalname));
//     fs.unlink(path.join(destDir, file.originalname), (err) => {
//       if (err) {
//         console.log("+++ deleteFile", err);
//       }
//     });
//   }
// }

export { processFile };
