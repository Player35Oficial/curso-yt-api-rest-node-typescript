import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";


// Qual cenário que estamos testando
describe("Cidades - Create", () => {

  // Caso de Teste 
  it("Cria registro", async () => {
    
    const res1 = await testServer
      .post("/cidades")
      .send({nome: "Caxias do Sul"});

    expect(typeof res1.body).toEqual("number");
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });
  // Caso de teste
  it("Não permite criar nome muito curto", async () => {
    
    const res1 = await testServer
      .post("/cidades")
      .send({nome: "Ca"});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});