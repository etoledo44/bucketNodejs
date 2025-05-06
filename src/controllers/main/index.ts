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
async function uploadFile(req: UploadRequest, res: Response): Promise<void> {
  console.time('/ post');

  console.log('+++ UploadDIr', UPLOAD_DIR);
  console.log('+++ TMP_DIR', TMP_DIR);

  const { cnpj } = JSON.parse(req.body.data);
  console.log('cnpj', cnpj);

  const files = req.files;

  if (!files) {
    console.timeEnd('/ post');
    res.status(500).json({ error: 'Não possui arquivo anexado!' });
    return;
  }

  try {
    const results = await processFile(cnpj, files);
    console.timeEnd('/ post');
    res.json(results);
  } catch (error: any) {
    console.timeEnd('/ post');
    res.status(500).json({ error: error.message });
  }
}

// Rota para listar arquivos disponíveis
async function getFiles(req: Request, res: Response): Promise<void> {
  console.time('/ get');
  console.log('req', req.query);
  const cnpj = req.query.cnpj as string;
  let pathString: string[] = [CONSTANTS.uploadDir];
  try {
    if (cnpj) {
      pathString.push(cnpj);
      console.log('pathString', pathString);
    }
    console.log('pathString', pathString);
    const file = fs.readdirSync(path.join(...pathString), { recursive: true });
    if (!file) {
      console.timeEnd('/ get');
      res.status(404).send('Arquivo não encontrado!');
      return;
    }
    console.timeEnd('/ get');
    res.status(200).json(file);
  } catch (error: any) {
    console.timeEnd('/ get');
    res.status(500).json({ error: error.message });
  }
}

// Rota para download de arquivos
async function downloadFile(req: Request, res: Response): Promise<void> {
  console.log('entrou na rota download');
  console.time('/download');

  try {
    const fileName = req.params.file;
    const cnpj = req.params.cnpj;
    const filePath = path.join(CONSTANTS.uploadDir, cnpj, fileName);
    console.log('filePath', filePath);

    // await checkAcessFiles(req.params.file);

    res.download(filePath, fileName, err => {
      if (err) {
        console.timeEnd('/download');
        console.error(err);
        if (!res.headersSent) {
          res.status(500).send('Erro ao realizar o download do arquivo.');
        }
      }
    });
  } catch (error: any) {
    console.timeEnd('/download');
    res.status(500).json({ error: error.message });
  }
}

export { getFiles, uploadFile, downloadFile };
