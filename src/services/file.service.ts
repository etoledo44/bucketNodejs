import path from 'path';
import { unlink, rename } from 'fs/promises';
import sharp from 'sharp';
import { UPLOAD_DIR, TMP_DIR } from '../config';
import { ensureDir } from '../utils/file.utils';
import { randomUUID } from 'crypto';
import { sanitizeString } from '../utils/string.utils';

async function processFile(cnpj: string, files: Express.Multer.File[]) {
  const destDir = path.join(UPLOAD_DIR, cnpj);
  await ensureDir(destDir);

  const results = [];

  for (const file of files) {
    const ext = path.extname(file.originalname).toLowerCase();
    const originalName = sanitizeString(path.basename(file.originalname, ext));
    const baseName = path.basename(`${randomUUID()}-${originalName}`, ext);
    let finalName;

    try {
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        finalName = `${baseName}.webp`;
        await sharp(file.path)
          .webp({ quality: 30, lossless: false })
          .toFile(path.join(destDir, finalName));

        results.push({ newName: `${finalName}` });
      } else {
        finalName = `${baseName}${ext}`;
        await rename(file.path, path.join(destDir, finalName));
        results.push({ newName: `${finalName}` });
      }
    } finally {
      await unlink(file.path);
    }
  }
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
