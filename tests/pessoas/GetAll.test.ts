import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


describe("Pessoas - GetAll", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall-pessoas@gmail.com";
    await testServer.post("/cadastrar").send({ nome: "teste", email, senha: "123456789" });

    const signRes = await testServer.post("/entrar").send({ email, senha: "123456789" });

    accessToken = signRes.body.accessToken;
  });
  
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });


  it("Busca registros", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "jucagetall@gmail.com",
        nomeCompleto: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});