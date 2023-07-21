import { server } from "./server/Server";

// A porta que irá rodar a API Node
server.listen(3333, () => console.log("App rodando!"))