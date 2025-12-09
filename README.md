# Multi-Channel Communication System

Resumo rápido
----------------
Projeto fullstack composto por:

- `back-end/` — Node + Express + Prisma (SQLite por padrão) para APIs e lógica do servidor.
- `front-end/` — Vite + React + Tailwind para a interface.

Este README descreve como configurar, rodar e depurar o projeto no ambiente de desenvolvimento (Windows / PowerShell).

Pré-requisitos
--------------
- Node.js 18+ (recomendado)
- npm
- Git

Estrutura principal
-------------------
- `/back-end` — servidor Express, Prisma, serviços e controllers.
  - `index.js` — ponto de entrada.
  - `src/routes`, `src/controllers`, `src/services`, `src/middlewares`, `src/config`.
  - `prisma/schema.prisma` e `prisma/migrations`.
- `/front-end` — app React com Vite.

Configuração e execução (passo a passo)
-------------------------------------

1) Clonar o repositório

```powershell
git clone <repo-url>
cd multi-channel-communication-system
```

2) Backend — instalar dependências e gerar client Prisma

Abra um terminal no diretório `back-end`:

```powershell
cd back-end
npm install
# Gere o Prisma Client (sempre que o schema mudar)
npx prisma generate
```

Se você alterar `schema.prisma` e quiser aplicar migrações locais:

```powershell
npx prisma migrate dev --name your-migration-name
```

3) Backend — rodar o servidor

```powershell
# na pasta back-end
node index.js
# (opcional) adicione um script de dev com nodemon e use `npm run dev`
```

O servidor usa a porta 3001 por padrão. Abra `http://localhost:3001/api/hello` para testar o health check.

4) Frontend — instalar dependências e rodar

Abra outro terminal no diretório `front-end`:

```powershell
cd ../front-end
npm install
npm run dev
```

O Vite informará a porta (padrão `http://localhost:5173`).

Documentação mínima das APIs (resumo)
----------------------------------
- POST `/auth/login` — body: { email, password } → retorna { token, user }
- POST `/auth/register` — body: { name, email, password, phone, warnings_preferences? } → cria usuário
- POST `/auth/logout` — (stateless: cliente descarta token)
- POST `/users/create` — create user (similar ao register)
- PUT `/users/update` — auth required, body: { id, item_data }
- DELETE `/users/delete` — auth required, body: { id }
- GET  `/users/get-by-email` — auth required (prefer usar query `?email=`)
- GET  `/users/get-by-id` — auth required (prefer `GET /users/:id`)

