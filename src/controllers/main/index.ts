import { Request, Response } from 'express';
import { checkAcessFiles } from '../../services/mainProcess/index';
import CONSTANTS from '../../config/constants';
import fs from 'fs';
import path from 'path';
import { UPLOAD_DIR, TMP_DIR } from '../../config';
import { _downloadFile, processFile } from '../../services/file.service';
import { buildFilePath } from '../../utils/path.utils';

interface UploadRequest extends Request {
  body: {
    data: string;
  };
  files: Express.Multer.File[];
}

// Rota para upload de arquivos
async function uploadFile(req: UploadRequest, res: Response): Promise<void> {
  console.time('/ post');
  const { cnpj, sistema } = JSON.parse(req.body.data);
  const files = req.files;

  if (!files) {
    console.timeEnd('/ post');
    res.status(500).json({ error: 'Não possui arquivo anexado!' });
    return;
  }

  try {
    const results = await processFile(cnpj, sistema, files);
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
  const { cnpj, sistema } = req.query as { cnpj: string; sistema: string };
  let pathString: string[] = [CONSTANTS.uploadDir];
  try {
    if (cnpj) {
      pathString.push(cnpj);
    }
    if (sistema) {
      pathString.push(sistema);
    }
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
    res.status(500).json({ error: 'Diretorio não encontrado!', details: error.message });
  }
}

// Rota para download de arquivos
async function downloadFile(req: Request, res: Response): Promise<void> {
  try {
    const fileName = req.params.file;
    const cnpj = req.params.cnpj;
    const sistema = req.params.sistema;

    const caminhoFile = buildFilePath({ cnpj, sistema, fileName });
    const caminho = buildFilePath({ cnpj, sistema });

    const result = await _downloadFile(caminho, fileName);
    if (result.erro) {
      res.status(500).json({ error: result.mensagem });
      return;
    }

    res.download(caminhoFile, fileName, err => {
      if (err) {
        console.timeEnd('/download');
        console.error(err.stack);
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
