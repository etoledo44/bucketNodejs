import { Router } from 'express';
const mainProcess = Router();
import upload from '../../middlewares/upload.middleware';

const { uploadFile, getFiles, downloadFile } = require('../../controllers/main');

mainProcess.post('/', upload.array('document', 10), uploadFile);
mainProcess.get('/', getFiles);
mainProcess.get('/download/:file', downloadFile);

export default mainProcess;
