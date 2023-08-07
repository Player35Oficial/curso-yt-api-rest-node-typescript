import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Usuários - Create / Sign Up", () => {
  it("Criar usuário", async () => {
    let usuarioId: number | undefined = undefined;

    const res = await testServer
      .post("/cadastrar")
      .send({ nome: "Yuri", email: "yuri@gmail.com", senha: "123456789" });

    usuarioId = res.body;

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof usuarioId).toEqual("number");
  });
  
  it("Tenta criar registro com nome muito curto", async () => {

    const res = await testServer
      .post("/cadastrar")
      .send({ nome: "Yu", email: "yuri@gmail.com", senha: "123456789" });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("Tenta criar registro com senha muito curta", async () => {

    const res = await testServer
      .post("/cadastrar")
      .send({ nome: "Yuri", email: "yuri@gmail.com", senha: "1239" });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("Tenta criar registro com formato de email inválido", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({ nome: "Yuri", email: "yuri-#gmail.com", senha: "1239" });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({});


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body");
  });

  it("Tenta criar dois com registros com o mesmo email", async () => {

    let usuario1Id: number | undefined = undefined;
    const usuario1 = await testServer
      .post("/cadastrar")
      .send({ nome: "Yuri", email: "yuri2@gmail.com", senha: "123456789" });

    usuario1Id = usuario1.body;
    const usuario2 = await testServer
      .post("/cadastrar")
      .send({ nome: "Yurie", email: "yuri2@gmail.com", senha: "123456789" });

    expect(usuario1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof usuario1Id).toEqual("number");

    expect(usuario2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(usuario2.body).toHaveProperty("errors.default", "Erro ao cadastrar o registro");
  });

});