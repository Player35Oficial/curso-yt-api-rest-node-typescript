import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


describe("Pessoas - UpdateById", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "updatebyid-pessoas@gmail.com";
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


  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        nomeCompleto: "Juca silva",
        email: "jucaupdate@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/pessoas/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        nomeCompleto: "Juca silva",
        email: "jucaupdates@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/pessoas/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "juca@gmail.com",
        nomeCompleto: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});