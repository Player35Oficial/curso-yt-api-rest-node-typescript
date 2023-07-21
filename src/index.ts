import { server } from "./server/Server";

// A porta que irá rodar a API Node
server.listen(process.env.PORT || 3333, () => {
  console.log(`App rodando na porta ${process.env.PORT || 3333}`);
});