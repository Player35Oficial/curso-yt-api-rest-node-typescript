import * as create from "./SignUp";
import * as getByEmail from "./SignIn";

export const UsuariosController = {
  ...create,
  ...getByEmail,
};