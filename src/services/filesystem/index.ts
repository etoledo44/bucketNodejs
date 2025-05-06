import CONSTANTS from '../../config/constants';
import { mkdir, access, constants } from 'fs/promises';
import path from 'path';

async function isFolderExist(folderName: string) {
  const pathFile = path.join(CONSTANTS.uploadDir, folderName);
  try {
    await access(pathFile, constants.F_OK);
    console.log('pasta ja criada');
    return true;
  } catch (error) {
    console.log('pasta não existe');
    console.log('vai criar pasta');

    await createFolder(pathFile);
    console.log('pasta criada');
    return true;
  }
}
async function createFolder(pathFile: string) {
  console.log('criando pasta');
  try {
    await mkdir(pathFile, { recursive: true });
  } catch (error: any) {
    return new Error(error);
  }
}

export { isFolderExist, createFolder };
