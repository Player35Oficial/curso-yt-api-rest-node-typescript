import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


describe("Pessoas - DeleteById", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "deletebyid-pessoas@gmail.com";
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

  it("Tenta apagar registro sem usar token de autenticação", async () => {
    const res1 = await testServer
      .delete("/pessoas/1")
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });


  it("Apaga registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "jucadelete@gmail.com",
        nomeCompleto: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/pessoas/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/pessoas/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});