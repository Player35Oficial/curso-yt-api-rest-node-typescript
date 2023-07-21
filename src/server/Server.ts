import express from "express";
import "dotenv/config";

import { router } from "./routes";

// Criar uma instância básica do servidor
const server = express();

server.use(express.json());

server.use(router);


// exportar a instãncia do servidor
export { server };