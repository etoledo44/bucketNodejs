import { Router, RequestHandler } from 'express';
const mainProcess = Router();
import upload from '../../middlewares/upload.middleware';

import { uploadFile, getFiles, downloadFile } from '../../controllers/main';

mainProcess.post('/', upload.array('document', 10), uploadFile as RequestHandler);
mainProcess.get('/', getFiles as RequestHandler);
mainProcess.get('/download/cnpj/:cnpj/file/:file', downloadFile as RequestHandler);

export default mainProcess;
