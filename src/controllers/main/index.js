const CONSTANTS = require("../../config/constants");
const { access, constants } = require("fs").promises;
const path = require("path");
// app.post("/login", (req, res) => {
//   console.time("login");
//   const user = req.body;
//   const userMock = {
//     id: 1,
//     name: "eriq",
//     password: "45646546",
//   };

//   const payload = { id: userMock.id, userName: userMock.name };
//   const jwt = generateToken(payload);

//   console.timeEnd("login");
//   return res.status(200).json(jwt);
// });

// Rota para upload de arquivos
async function uploadFile(req, res) {
  console.time("/ post");
  const file = req.files;

  if (!file) {
    console.timeEnd("/ post");
    return res.status(500).json({ error: "Não possui arquivo anexado!" });
  }

  let filesArr = [];
  for (let index = 0; index < file.length; index++) {
    filesArr.push(file[index].originalname);
  }

  console.timeEnd("/ post");
  return res.status(200).json({ filesArr });
}

// Rota para listar arquivos disponíveis
async function getFiles(req, res) {
  console.time("/ get");
  try {
    const file = fs.readdirSync(CONSTANTS.uploadDir, { recursive: true });
    if (!file) {
      console.timeEnd("/ get");
      return res.status(404).send("Arquivo não encontrado!");
    }
    console.timeEnd("/ get");
    return res.status(200).json(file);
  } catch (error) {
    console.timeEnd("/ get");
    return res.status(500).json({ error: true });
  }
}

// Rota para download de arquivos
async function downloadFile(req, res) {
  console.time("/download");

  try {
    const filePath = path.join(CONSTANTS.uploadDir, req.params.file);
    const fileName = req.params.file;

    await access(filePath, constants.F_OK | constants.R_OK);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.timeEnd("/download");
        console.error(err);
        if (!res.headersSent) {
          console.timeEnd("/download");
          return res
            .status(500)
            .send("Erro ao realizar o download do arquivo.");
        }
      }
    });
  } catch (error) {
    console.timeEnd("/download");
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFiles,
  uploadFile,
  downloadFile,
};
