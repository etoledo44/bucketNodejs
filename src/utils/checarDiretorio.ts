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
    console.log('diretorio encontrado');
    const caminhoArquivo = path.join(diretorio, arquivo);

    // Verifica se o arquivo existe no diretório
    if (!fs.existsSync(caminhoArquivo)) {
      console.log('arquivo não encontrado');
      return {
        erro: true,
        mensagem: 'Arquivo não encontrado no diretório',
      };
    }
    console.log('arquivo encontrado');
    return {
      erro: false,
      mensagem: 'Arquivo encontrado com sucesso',
      caminho: caminhoArquivo,
    };
  } catch (erro) {
    return {
      erro: true,
      mensagem: `Erro ao verificar diretório/arquivo: ${erro.message}`,
    };
  }
};

export default checarDiretorio;
