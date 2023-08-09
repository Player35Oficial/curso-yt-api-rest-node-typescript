import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


describe("Pessoas - Create", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoas@gmail.com";
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


  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        email: "juca@gmail.com",
        cidadeId,
        nomeCompleto: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Cadastra registro 2", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        email: "juca2@gmail.com",
        cidadeId,
        nomeCompleto: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        email: "jucaduplicado@gmail.com",
        cidadeId,
        nomeCompleto: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "jucaduplicado@gmail.com",
        nomeCompleto: "duplicado",
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Tenta criar registro com nomeCompleto muito curto", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "juca@gmail.com",
        nomeCompleto: "Ju",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
  it("Tenta criar registro sem nomeCompleto", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "juca@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
  it("Tenta criar registro sem email", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        nomeCompleto: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro com email inválido", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId,
        email: "juca gmail.com",
        nomeCompleto: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro sem cidadeId", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        email: "juca@gmail.com",
        nomeCompleto: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
  });
  it("Tenta criar registro com cidadeId inválido", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cidadeId: "teste",
        email: "juca@gmail.com",
        nomeCompleto: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
  });
  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {

    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.cidadeId");
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
});