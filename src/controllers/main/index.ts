import { Request, Response } from 'express';
import { checkAcessFiles } from '../../services/mainProcess/index';
import CONSTANTS from '../../config/constants';
import fs from 'fs';
import path from 'path';
import { UPLOAD_DIR, TMP_DIR } from '../../config';
import { processFile } from '../../services/file.service';

interface UploadRequest extends Request {
  body: {
    data: string;
  };
  files: Express.Multer.File[];
}

// Rota para upload de arquivos
async function uploadFile(req: UploadRequest, res: Response) {
  console.time('/ post');

  console.log('+++ UploadDIr', UPLOAD_DIR);
  console.log('+++ TMP_DIR', TMP_DIR);

  const { cnpj } = JSON.parse(req.body.data);
  console.log('cnpj', cnpj);

  const files = req.files;

  if (!files) {
    console.timeEnd('/ post');
    return res.status(500).json({ error: 'Não possui arquivo anexado!' });
  }

  try {
    const results = await processFile(cnpj, files);
    console.timeEnd('/ post');
    res.json(results);
  } catch (error: any) {
    console.timeEnd('/ post');
    return res.status(500).json({ error: error.message });
  }

  // console.timeEnd("/ post");
  // return res.status(200).json({ filesArr });
}

// Rota para listar arquivos disponíveis
async function getFiles(req: Request, res: Response) {
  console.time('/ get');
  try {
    const file = fs.readdirSync(CONSTANTS.uploadDir, { recursive: true });
    if (!file) {
      console.timeEnd('/ get');
      return res.status(404).send('Arquivo não encontrado!');
    }
    console.timeEnd('/ get');
    return res.status(200).json(file);
  } catch (error) {
    console.timeEnd('/ get');
    return res.status(500).json({ error: true });
  }
}

// Rota para download de arquivos
async function downloadFile(req: Request, res: Response) {
  console.time('/download');

  try {
    const fileName = req.params.file;
    const filePath = path.join(CONSTANTS.uploadDir, req.params.file);

    await checkAcessFiles(req.params.file);

    res.download(filePath, fileName, err => {
      if (err) {
        console.timeEnd('/download');
        console.error(err);
        if (!res.headersSent) {
          console.timeEnd('/download');
          return res.status(500).send('Erro ao realizar o download do arquivo.');
        }
      }
    });
  } catch (error: any) {
    console.timeEnd('/download');
    return res.status(500).json({ error: error.message });
  }
}

export { getFiles, uploadFile, downloadFile };
