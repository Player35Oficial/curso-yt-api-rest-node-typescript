import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import  * as yup  from "yup";
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";


interface IQueryProps {
  id?: number,
  page?: number,
  limit?: number,
  filter?: string,
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    filter: yup.string().optional()
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const { id, filter, limit, page } = req.query;

  const results = await PessoasProvider.getAll(filter || "", limit || 10, page || 1, Number(id));
  const count  = await PessoasProvider.count(filter);

  if (results instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: results.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(results);
};