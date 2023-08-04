import { Request, Response } from "express";
import * as yup from "yup";
import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";

// Validar o corpo da requisição
interface IBodyProps extends Omit<IPessoa, "id"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().email().required(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3)
  }))
}));


export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {

  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);

};