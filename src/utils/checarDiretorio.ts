import fs from 'fs';
import path from 'path';

const checarDiretorio = async (diretorio: string, arquivo: string) => {
  try {
    console.log('checando diretorio');
    // Verifica se o diretório existe
    if (!fs.existsSync(diretorio)) {
      return {
        erro: true,
        mensagem: 'Diretório não encontrado',
      };
    }
    const caminhoArquivo = path.join(diretorio, arquivo);
    
    // Verifica se o arquivo existe no diretório
    if (!fs.existsSync(caminhoArquivo)) {
      return {
        erro: true,
        mensagem: 'Arquivo não encontrado no diretório',
      };
    }
    return {
      erro: false,
      mensagem: 'Arquivo encontrado com sucesso',
      caminho: `${path.join(diretorio)}`,
    };
  } catch (erro: any) {
    return {
      erro: true,
      mensagem: `Erro ao verificar diretório/arquivo: ${erro.message}`,
    };
  }
};

export default checarDiretorio;
