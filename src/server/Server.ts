import express from "express";

// Criar uma instância básica do servidor
const server = express();

server.get("/", (_, res) => {
  return res.send("Olá, DEV!")
})



// exportar a instãncia do servidor
export { server }