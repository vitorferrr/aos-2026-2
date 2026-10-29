# aos-2026-2

Aplicações Orientadas a Serviços (2026.2) — UNICAP

Repositório com os projetos da disciplina. Atualmente contém:

- [`express-01`](express-01): API REST em Node.js com Express, Sequelize e PostgreSQL.

## express-01

API de exemplo com usuários e mensagens. Inclui as seguintes proteções:

- **Helmet:** cabeçalhos HTTP de segurança.
- **CORS:** apenas as origens configuradas podem acessar a API.
- **Rate limiting:** limite global de requisições, com regras específicas para rotas de autenticação.
- **Tratamento global de erros:** erros padronizados via `AppError`.
- **Validação de ambiente (fail-fast):** com o Zod, o servidor não sobe se alguma variável de ambiente estiver ausente ou inválida.

### Requisitos

- Node.js 20 ou superior
- Um banco PostgreSQL acessível (por exemplo, no [Neon](https://neon.tech))

### Como rodar

```bash
cd express-01
npm install
cp .env.sample .env   # depois edite o .env com seus valores
npm run dev
```

O servidor sobe na porta definida em `PORT` (padrão: `4001`).

### Variáveis de ambiente

Configure no arquivo `.env`. Use o [`.env.sample`](express-01/.env.sample) como modelo.

| Variável                 | Obrigatória | Padrão        | Descrição                                                          |
| ------------------------ | ----------- | ------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`           | Sim         | —             | URL de conexão com o PostgreSQL.                                   |
| `ALLOWED_ORIGINS`        | Sim         | —             | Origens permitidas pelo CORS, separadas por vírgula.               |
| `JWT_SECRET`             | Sim         | —             | Segredo usado para assinar tokens (mínimo de 10 caracteres).       |
| `PORT`                   | Não         | `4001`        | Porta do servidor.                                                 |
| `NODE_ENV`               | Não         | `development` | Ambiente: `development`, `production` ou `test`.                   |
| `ERASE_DATABASE_ON_SYNC` | Não         | `false`       | Se `true`, apaga e recria as tabelas ao iniciar e cria dados de exemplo. |

> **Atenção:** nunca faça commit do `.env`. Ele contém credenciais e já está no `.gitignore`.

#### O que acontece se faltar uma variável?

O servidor não inicia. Ele mostra quais variáveis estão com problema e encerra com código 1:

```
Variáveis de ambiente inválidas ou ausentes:
  - DATABASE_URL: Invalid input: expected string, received undefined
```

### Scripts

| Comando         | O que faz                                          |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Inicia em modo desenvolvimento, com reinício automático. |
| `npm run build` | Compila o código de `src` para a pasta `dist`.     |
| `npm start`     | Executa a versão compilada (`dist`).               |

### Rotas

| Método | Rota                 | Descrição                    |
| ------ | -------------------- | ---------------------------- |
| GET    | `/`                  | Verifica se o servidor está no ar. |
| GET    | `/session`           | Retorna a sessão atual.      |
| GET    | `/users`             | Lista os usuários.           |
| GET    | `/users/:userId`     | Busca um usuário.            |
| POST   | `/users`             | Cria um usuário.             |
| PUT    | `/users/:userId`     | Atualiza um usuário.         |
| DELETE | `/users/:userId`     | Remove um usuário.           |
| GET    | `/messages`          | Lista as mensagens.          |
| GET    | `/messages/:messageId` | Busca uma mensagem.        |
| POST   | `/messages`          | Cria uma mensagem.           |
| PUT    | `/messages/:messageId` | Atualiza uma mensagem.     |
| DELETE | `/messages/:messageId` | Remove uma mensagem.       |

### Estrutura do código

```
express-01/src
├── index.js         # ponto de entrada: valida o ambiente e inicia o servidor
├── routes/          # define as rotas
├── controllers/     # recebem a requisição e devolvem a resposta
├── services/        # regras de negócio
├── repositories/    # acesso ao banco de dados
├── models/          # modelos do Sequelize (User, Message)
├── middlewares/     # CORS, rate limit, logger, tratamento de erros etc.
└── utils/           # env.js (validação do ambiente) e appError.js
```

O fluxo de uma requisição é: **rota → controller → service → repository → banco**.

