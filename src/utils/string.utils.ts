/**
 * Remove caracteres especiais e acentos de uma string
 * @param str String a ser sanitizada
 * @returns String sem caracteres especiais e acentos
 */
export function sanitizeString(str: string): string {
  return str
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove caracteres especiais, mantendo letras, números e espaços
    .replace(/\s+/g, '_') // Substitui espaços por underscore
    .toLowerCase(); // Converte para minúsculo
}

/**
 * Remove caracteres especiais mantendo apenas letras e números
 * @param str String a ser sanitizada
 * @returns String contendo apenas letras e números
 */
export function removeSpecialChars(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Remove caracteres especiais mantendo letras, números e alguns caracteres específicos
 * @param str String a ser sanitizada
 * @param keepChars Caracteres adicionais a serem mantidos (opcional)
 * @returns String sanitizada
 */
export function sanitizeWithCustomChars(str: string, keepChars: string = ''): string {
  const regex = new RegExp(`[^a-zA-Z0-9${keepChars}]`, 'g');
  return str.replace(regex, '');
}
