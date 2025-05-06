import { access, constants } from 'fs/promises';
import path from 'path';
import CONSTANTS from '../../config/constants';

async function checkAcessFiles(fileName: string) {
  console.log('acessou checkAcessFiles');
  const filePath = path.join(CONSTANTS.uploadDir, fileName);
  await access(filePath, constants.F_OK | constants.R_OK);
}

export { checkAcessFiles };
