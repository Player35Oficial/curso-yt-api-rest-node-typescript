import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Usuários - Access / Sign In", () => {
  it("Entra com usuário", async () => {
    let usuarioId: number | undefined = undefined;

    const res = await testServer
      .post("/cadastrar")
      .send({ nome: "Yuri", email: "yuri@gmail.com", senha: "123456789" });

    usuarioId = res.body;

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof usuarioId).toEqual("number");

    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri@gmail.com", senha: "123456789" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.OK);
    expect(signUser.body).toHaveProperty("accessToken");
  });

  it("Erro ao acessar com email não cadastrado", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri23@gmail.com", senha: "123456789" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(signUser.body).toHaveProperty("errors.default", "Email ou senha inválidos");
  });

  it("Erro ao acessar com senha não cadastrada", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri@gmail.com", senha: "1234569" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(signUser.body).toHaveProperty("errors.default", "Email ou senha inválidos");
  });

  it("Erro ao acessar com email e senha não cadastrados", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri42@gmail.com", senha: "1234569" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(signUser.body).toHaveProperty("errors.default", "Email ou senha inválidos");
  });

  it("Erro ao acessar com formato de email inválido", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri#gmail.com", senha: "1234569" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signUser.body).toHaveProperty("errors.body.email", "Formato de e-mail digitado não é valido");
  });

  it("Erro ao acessar com formato de senha inválido", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri@gmail.com", senha: 1234569 });
    
    expect(signUser.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(signUser.body).toHaveProperty("errors.default", "Email ou senha inválidos");
  });

  it("Erro ao acessar sem enviar email", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ senha: 1234569 });
    
    expect(signUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signUser.body).toHaveProperty("errors.body.email", "Este campo é obrigatório");
  });

  it("Erro ao acessar sem enviar senha", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({ email: "yuri@gmail.com" });
    
    expect(signUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signUser.body).toHaveProperty("errors.body.senha", "Este campo é obrigatório");
  });

  it("Erro ao acessar sem enviar email e senha", async () => {
    const signUser = await testServer
      .post("/entrar")
      .send({});
    
    expect(signUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signUser.body).toHaveProperty("errors.body.email", "Este campo é obrigatório");
    expect(signUser.body).toHaveProperty("errors.body.senha", "Este campo é obrigatório");
  });
});