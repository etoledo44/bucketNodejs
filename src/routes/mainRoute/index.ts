import { Router, RequestHandler } from 'express';
const mainProcess = Router();
import upload from '../../middlewares/upload.middleware';

import { uploadFile, getFiles, downloadFile } from '../../controllers/main';
import { LIMIT_FILES } from '../../config';

mainProcess.post('/', upload.array('document', LIMIT_FILES), uploadFile as RequestHandler);
mainProcess.get('/', getFiles as RequestHandler);
mainProcess.get('/download/cnpj/:cnpj/sistema/:sistema/file/:file', downloadFile as RequestHandler);

export default mainProcess;
