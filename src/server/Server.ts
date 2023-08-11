import express from "express";
import cors from "cors";
import "dotenv/config";

import "./shared/services/TranslationsYup";
import { router } from "./routes";

// Criar uma instância básica do servidor
const server = express();

server.use(cors({
  origin: "https://youtube-curso-react-materialui-typescript-integ-player35oficial.vercel.app"
}));
// server.use(cors({
//   origin: process.env.ENABLED_CORS?.split(";") || []
// }));

server.use(express.json());

server.use(router);


// exportar a instãncia do servidor
export { server };