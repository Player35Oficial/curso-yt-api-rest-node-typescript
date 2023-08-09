import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

// Qual cenário que estamos testando
describe("Cidades - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidades@gmail.com";
    await testServer.post("/cadastrar").send({ nome: "teste", email, senha: "123456789" });

    const signRes = await testServer.post("/entrar").send({ email, senha: "123456789" });

    accessToken = signRes.body.accessToken;
  });

  // Caso de Teste
  it("Tenta criar um registro sem token de acesso", async () => {
    const res1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  // Caso de Teste
  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: "Caxias do Sul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  // Caso de teste
  it("Não permite criar nome muito curto", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: "Ca" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
