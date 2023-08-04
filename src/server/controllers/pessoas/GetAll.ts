import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import  * as yup  from "yup";
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";


interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string,
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0).default(1),
    limit: yup.number().optional().moreThan(0).default(7),
    filter: yup.string().optional().default("")
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const { filter, limit, page } = req.query;

  const results = await PessoasProvider.getAll(filter || "", limit || 7, page || 1);
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