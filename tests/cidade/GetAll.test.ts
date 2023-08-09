import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


describe("Cidades - GetAll", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall-cidades@gmail.com";
    await testServer.post("/cadastrar").send({ nome: "teste", email, senha: "123456789" });

    const signRes = await testServer.post("/entrar").send({ email, senha: "123456789" });

    accessToken = signRes.body.accessToken;
  });

  it("Buscar todos os registros", async () => {

    const res1 = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: "Caxias do sul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
