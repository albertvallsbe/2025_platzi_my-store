# 🎓 2025 Curs platzi / 2025 Platzi course

-Curs de Backend amb Node.js: BBDD amb PostgreSQL

-Backend course with Node.js: With PostgreSQL DDBB

> https://platzi.com/cursos/backend-nodejs-postgres/

### Albert Valls

## 📚 Índex / Table of Contents

1. [Sobre el projecte / About](#1-sobre-el-projecte--about)
2. [Funcionalitats / Features](#2-funcionalitats--features)
3. [Tecnologia / Tech Stack](#3-tecnologia--tech-stack)
4. [Demo en línia / Live Demo](#4-demo-en-línia--live-demo)
5. [Repositori / Repository](#5-repositori--repository)
6. [Instal·lació / Installation](#6-installació--installation)

## 1. Sobre el projecte / About

**CAT:**

Aquest repositori és un _starter kit_ de backend amb **Node.js**, **Express** i **TypeScript** pensat per crear APIs REST segures, consistents i fàcils de desplegar. Inclou:

- Validació d’entrada amb Joi per garantir que els `body`, `params` i `query` compleixen l’esquema esperat abans d’arribar a la lògica de negoci.
- Gestió d’errors HTTP amb Boom, retornant respostes coherents (codi, missatge i detalls) i separant clarament els errors operacionals dels desconeguts.
- CORS configurat per permetre o restringir orígens i mètodes de manera declarativa segons l’entorn.
- Serveis amb dades simulades mitjançant `@faker-js/faker` per facilitar proves.
- Estructura modular en capes (rutes ➜ serveis) per facilitar proves, codi mantenible i escalable.
- Configuració per entorns via variables d’entorn `.env`
- Scripts de desenvolupament amb _hot reload_ `nodemon` i _build_ a JavaScript amb TypeScript `tsc` per a producció.
- Preparació per desplegament a Railway, amb sortida a `dist/` i arrencada directa amb `node .`.

> L’objectiu és oferir una base sòlida per a projectes d’API amb rutes d’exemple, validacions de dades i respostes d’error uniformes, llesta per portar a producció a Railway.

**EN:**

This repository is a _starter kit_ for backend development with **Node.js**, **Express**, and **TypeScript**, designed to create secure, consistent, and easy-to-deploy REST APIs. It includes:

- Input validation with Joi to ensure that `body`, `params` and `query` comply with the expected schema before reaching the service logic.
- HTTP error handling with Boom, returning consistent responses (status code, message, and details) and clearly separating operational errors from unknown ones.
- CORS configuration to allow or restrict origins and methods declaratively depending on the environment.
- Services with simulated data using `@faker-js/faker` to facilitate testing.
- Modular layered structure (routes ➜ services) to enable testing and maintainable, scalable code.
- Environment configuration through `.env` variables.
- Development scripts with _hot reload_ using `nodemon` and a production-ready JavaScript _build_ using TypeScript `tsc`.
- Deployment ready for Railway, with output in `dist/` and direct startup using `node .`.

> The goal is to provide a solid foundation for API projects with example routes, data validations, and uniform error responses, ready to be deployed to production on Railway.

## 2. Funcionalitats / Features

- ✅ **Node.js**
- ✅ **Express**
- ✅ **TypeScript → JavaScript**
- ✅ **SQL → Postgres**
- ✅ **Sequelize**
- ✅ **Docker**
- ✅ **Joi (validacions)**
- ✅ **Boom (errors HTTP)**
- ✅ **CORS configurat**
- ✅ **Desplegament Railway**

## 3. Tecnologia / Tech Stack

- **Node.js (20.x)**
- **Express (5.x)**
- **TypeScript**
- **JavaScript (ES2022+)**
- **SQL → Postgres**
- **Sequelize**
- **Docker**
- **Joi**
- **@hapi/boom**
- **CORS**
- **dotenv**
- **@faker-js/faker**
- **Nodemon**
- **Git & GitHub**
- **Railway**

## 4. Demo en línia / Live Demo

**Live:** 👉 https://2025-platzi-mystore.up.railway.app/products/

**CAT:**  
Visita la demo en línia per veure l’API en funcionament.  
Es poden realitzar les següents operacions CRUD sobre la ruta `/products`:

**EN:**  
Check out the live demo to see the API in action.  
You can perform the following CRUD operations on the `/products` endpoint:

- Get all products → `GET /products`
- Get product by id → `GET /products/{uuid}`
- Create product → `POST /products`
- Update product by id → `PATCH /products/{uuid}`
- Delete product by id → `DELETE /products/{uuid}`

## 5. Repositori / Repository

**Github:** 👉 https://github.com/albertvallsbe/2025_platzi_my-store

## 6. Instal·lació / Installation

**CAT:**

_Segueix aquests passos per clonar el projecte i fer servir el compilador TypeScript en mode “watch” i executa el servidor Express.js també en mode "watch"._

**EN:**

_Follow these steps to clone the project, use the TypeScript compiler in “watch” mode, and run the server with Express.js also in “watch” mode._

**Requeriments / Prerequisites**

- Node.js

### 1) Clonar el repositori / Clone the repository

```bash
git clone https://github.com/albertvallsbe/2025_platzi_my-store.git
```

### 2) Entrar al directori del projecte / Navigate into the project directory

```
cd 2025_platzi_my-store
```

### 3) Instal·lar dependències / Install dependencies

```
npm i
```

### 4) Crea el fitxer de variables d'ambient `.env` a partir de `.env.example` / Create the `.env` file from `.env.example`

```
cp .env.example .env
```

### 5) Executar el compilador de `TSC` en mode watch / Run `TSC` compiler in watch mode

```
npm run build-w
```

### 6) Executar el servidor amb `nodemon` en mode desenvolupament / Run the server with `nodemon` in development mode

```
npm run start-w
```

### 7) Obre el live Server de Express.js / Open the Live Server of Express.js

```
http://localhost:3100
```
