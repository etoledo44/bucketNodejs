import path from 'path';

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'documents');
const TMP_DIR = path.join(UPLOAD_DIR, 'tmp');

export { UPLOAD_DIR, TMP_DIR };
