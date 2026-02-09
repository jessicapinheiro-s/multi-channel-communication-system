# Multi-Channel Communication System

PROD FRONT-END: https://multi-channel-communication-system.onrender.com
PROD API:  https://multi-channel-communication-system-psi.vercel.app/
Resumo rápido
----------------
Projeto fullstack composto por:

- `back-end/` — Node + Express + Prisma + Postgresql.
- `front-end/` — Vite + React + Tailwind para a interface.

Este README descreve como configurar, rodar e depurar o projeto no ambiente de desenvolvimento (Windows / PowerShell).

Pré-requisitos
--------------
- Node.js 18+ (recomendado)
- npm
- Git

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

## Funcionalidades do Front-end ✅

- **Autenticação**
- **Registro de Receptores** 
- **Dashboard / Admin** 
- **Criação e Envio de Campanhas** 
- **Visualização de Mensagens / Logs** 
- **UX / Componentes** 

## Rotas do Back-end 🔧

> Observação: o servidor expõe as rotas abaixo sob o host (EM DEV) `http://localhost:3001`.

- **Health check**
  - `GET /api/hello` — sem autenticação, retorna status do backend.

- **Auth** (`/auth`)
  - `POST /auth/login` — body: `{ email, password }` → seta cookie `token` e retorna o usuário.
  - `POST /auth/logout` — requer auth, limpa cookie `token`.
  - `POST /auth/register` — requer auth (uso administrativo), cria um usuário.
  - `GET /auth/me` — requer auth, retorna o usuário atual.

- **Usuários** (`/users`)
  - `POST /users/create` — cria usuário.
  - `PUT /users/update` — **auth** required, body: `{ id, itemInfo }` → atualiza campos do usuário.
  - `DELETE /users/delete` — **auth** required, body: `{ id }` → remove usuário.
  - `GET /users/get-by-email` — **auth** required, query `?email=` → busca por email.
  - `GET /users/get-by-id` — **auth** required, query `?id=` (ou `req.params` em alguns handlers).

- **Recipients / Receptors** (`/recipients` e `/receptors`) — mesmas rotas (alias para compatibilidade)
  - `POST /recipients/create` — body: `{ name, email, phone, preferences }` → cria receptor.
  - `GET /recipients/get-all` — lista todos os receptores.

- **Warnings (Campanhas)** (`/warnings`)
  - `POST /warnings/create` — body: `{ status, message, title?, channel? }` → cria campanha/aviso.
  - `PATCH /warnings/update` — **auth** required, body: `{ id, itemInfo }` → atualiza campanha (status, message etc.).
  - `DELETE /warnings/delete` — **auth** required, (params: `id`).
  - `GET /warnings/get-by-id` — **auth** required, (params: `id`).
  - `GET /warnings/get-all` — lista campanhas.

- **Warning Logs (Mensagens enviadas / fila)** (`/warnings_logs`)
  - `GET /warnings_logs/get-all` — lista todos os logs/mensagens.
  - `POST /warnings_logs/create` — body: `{ user_id, warningId, channel, sent_at }` → cria log de envio.
  - `GET /warnings_logs/get-by-id` — **auth** required, params: `warning_id` → logs por warning.
  - `PATCH /warnings_logs/update` — **auth** required, body: `{ id, item_info }` → atualiza log (status, sent_at).

- **Emails** (`/emails`)
  - `POST /emails/create` — **auth** required, body: `{ to_email, to_name, subject, message, recipient_id, from_email, from_name, warning_id }` → envia e-mail via serviço do backend.


