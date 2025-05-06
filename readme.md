# BucketNodeJS

## Descrição
BucketNodeJS é uma aplicação Node.js que permite o upload, visualização e download de arquivos. Ele utiliza Express para gerenciar as rotas, Multer para lidar com uploads de arquivos e dotenv para gerenciar variáveis de ambiente.

## Instalação
Para instalar as dependências do projeto, execute:
```bash
npm install
```

## Configuração
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```properties
PORT=5050
```

## Executando a Aplicação
Para iniciar a aplicação em modo de desenvolvimento, execute:
```bash
npm run dev
```
Para iniciar a aplicação em modo de produção, execute:
```bash
npm start
```

## Endpoints
### Upload de Arquivos
- **POST /**: Faz o upload de arquivos. Os arquivos devem ser enviados no campo `document` do formulário.

### Visualizar Arquivos
- **GET /**: Retorna a lista de arquivos disponíveis para download.

### Download de Arquivos
- **GET /download/:file**: Faz o download de um arquivo específico. Substitua `:file` pelo nome do arquivo.

### Visualizar Arquivos Estáticos
- **GET /visualizar**: Permite visualizar os arquivos estáticos na pasta de documentos.

## Estrutura do Projeto
```
gBucket/
├── documents/
│   └── images/
├── src/
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── readme.md
```

## Dependências
- body-parser: ^1.20.3
- dotenv: ^16.4.7
- express: ^4.21.2
- multer: ^1.4.5-lts.1
- nodemon: ^3.1.9

## Licença
Este projeto está licenciado sob a licença ISC.
