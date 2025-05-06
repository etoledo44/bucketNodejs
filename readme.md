# BucketNodeJS - API de Upload de Arquivos

API REST para gerenciamento de upload e download de arquivos, desenvolvida com Node.js, TypeScript e Express.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Multer (Upload de arquivos)
- ESLint + Prettier (Padronização de código)
- JWT (Autenticação)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd BucketNodeJS
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=5050
JWT_SECRET=seu_segredo_jwt
```

## 🚀 Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm run start`: Inicia o servidor em modo produção
- `npm run lint`: Executa o ESLint para verificar o código
- `npm run format`: Formata o código usando Prettier
- `npm run typecheck`: Verifica os tipos TypeScript

## 📁 Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controllers/    # Controladores da aplicação
├── middlewares/    # Middlewares (upload, autenticação)
├── routes/         # Rotas da API
├── services/       # Serviços e lógica de negócio
├── utils/          # Utilitários
└── index.ts        # Ponto de entrada da aplicação
```

## 🔒 Rotas da API

### Upload de Arquivos
- `POST /`: Upload de múltiplos arquivos
  - Body: FormData com campo 'document' (máximo 10 arquivos)
  - Body: JSON com campo 'data' contendo CNPJ

### Listagem de Arquivos
- `GET /`: Lista todos os arquivos disponíveis

### Download de Arquivos
- `GET /download/:file`: Download de um arquivo específico

## 🔧 Configuração do Ambiente de Desenvolvimento

O projeto utiliza:
- ESLint para linting
- Prettier para formatação de código
- TypeScript para tipagem estática

### Configurações

- `.eslintrc.cjs`: Configurações do ESLint
- `.prettierrc`: Configurações do Prettier
- `tsconfig.json`: Configurações do TypeScript

## 📦 Dependências Principais

- `express`: Framework web
- `multer`: Middleware para upload de arquivos
- `express-jwt`: Middleware de autenticação JWT
- `dotenv`: Gerenciamento de variáveis de ambiente
- `sharp`: Processamento de imagens

## 🔐 Segurança

- Autenticação via JWT
- Validação de tipos com TypeScript
- Sanitização de inputs
- Proteção contra upload de arquivos maliciosos

## 📄 Licença

Este projeto está sob a licença ISC.
