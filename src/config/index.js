const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "..", "..", "documents");
const TMP_DIR = path.join(UPLOAD_DIR, "tmp");

module.exports = {
  UPLOAD_DIR,
  TMP_DIR
}