require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const { expressjwt } = require("express-jwt");
const { generateToken } = require("./jwt");

// Define os diretórios de upload
const uploadDir = path.join(__dirname, "..", "documents");
const uploadDirImages = path.join(__dirname, "..", "documents", "images");

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Cria o diretório de upload se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Se o arquivo for uma imagem .webp, salva no diretório de imagens
    if (path.extname(file.originalname) == ".webp") {
      if (!fs.existsSync(uploadDirImages)) {
        fs.mkdirSync(uploadDirImages, { recursive: true });
      }
      cb(null, uploadDirImages);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    // Gera um nome único para o arquivo
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname))+path.extname(file.originalname)
    );
  },
});

/**
 * path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        randomUUID() +
        path.extname(file.originalname)
 * 
 */
const upload = multer({ storage });

const app = express();

// Configura o middleware para servir arquivos estáticos
app.use("/visualizar", express.static(uploadDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   expressjwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//   }).unless({ path: ["/login"] })
// );

app.post("/login", (req, res) => {
  console.time("login");
  const user = req.body;
  const userMock = {
    id: 1,
    name: "eriq",
    password: "45646546",
  };

  const payload = { id: userMock.id, userName: userMock.name };
  const jwt = generateToken(payload);

  console.timeEnd("login");
  return res.status(200).json(jwt);
});
// Rota para upload de arquivos
app.post("/", upload.array("document", 10), (req, res) => {
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
  return res.status(200).json({filesArr});
});

// Rota para listar arquivos disponíveis
app.get("/", (req, res) => {
  console.time("/ get");
  try {
    const file = fs.readdirSync(uploadDir, { recursive: true });
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
});

// Rota para download de arquivos
app.get("/download/:file", (req, res) => {
  console.time("/download");
  const filePath = path.join(uploadDir, req.params.file);
  const fileName = req.params.file;

  try {
    fs.accessSync(filePath, fs.constants.F_OK | fs.constants.R_OK, (error) => {
      if (error) {
        console.timeEnd("/download");
        return res.status(404).send("Arquivo não encontrado!");
      }
    });

    console.timeEnd("/download");
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.timeEnd("/download");
        res
          .status(500)
          .send("Erro ao realizar o download do arquivo.")
          .json({ error: err.message });
      }
    });
  } catch (error) {
    console.timeEnd("/download");
    return res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor na porta definida no arquivo .env
const PORT = process.env.PORT || 5050;
app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta: ${PORT}`);
});
