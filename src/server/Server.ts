import express from "express";

import { router } from "./routes";

// Criar uma instância básica do servidor
const server = express();

server.use(express.json());

server.use(router);


// exportar a instãncia do servidor
export { server };