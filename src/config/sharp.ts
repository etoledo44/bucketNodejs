// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');
// const CONSTANTS = require('./constants');

// async function convertImage(file) {
//   console.log('iniciou a conversão');
//   try {
//     // Verifica se o diretório de imagens convertidas existe
//     if (!fs.existsSync(CONSTANTS.uploadDirImages)) {
//       fs.mkdirSync(CONSTANTS.uploadDirImages, { recursive: true });
//     }

//     const filename = path.basename(file.originalname, path.extname(file.originalname));
//     const outputPath = path.join(CONSTANTS.uploadDirImages, `${filename}.webp`);

//     // Converte a imagem para webp e otimiza
//     await sharp(file.path)
//       .webp({ quality: 5 }) // Qualidade de 80%
//       .toFile(outputPath);

//     // Remove o arquivo original após conversão
//     fs.unlinkSync(file.path);

//     return {
//       success: true,
//       filename: `${filename}.webp`,
//     };
//   } catch (error) {
//     console.error('Erro ao converter imagem:', error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// module.exports = {
//   convertImage,
// };
