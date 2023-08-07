// Sign up - Cadastrar usuário
import * as yup from "yup";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IUsuario, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required().min(5),
    senha: yup.string().required().min(6)
  }))
}));

export const signUp =  async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};