import path from 'path';
import { UPLOAD_DIR } from '../config';

type PathParams = {
  cnpj?: string;
  sistema?: string;
  fileName?: string;
  baseDir?: string;
};

/**
 * Constrói um caminho de arquivo baseado nos parâmetros fornecidos
 * @param params Parâmetros para construção do caminho
 * @returns Caminho completo do arquivo
 */
export function buildFilePath(params: PathParams): string {
  const { cnpj, sistema, fileName, baseDir = UPLOAD_DIR } = params;
  const pathParts: string[] = [baseDir];

  if (cnpj) pathParts.push(cnpj);
  if (sistema) pathParts.push(sistema);
  if (fileName) pathParts.push(fileName);

  return path.join(...pathParts);
}
