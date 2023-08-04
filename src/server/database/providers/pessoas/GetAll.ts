import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const getAll = async (
  filter: string, 
  limit: number, 
  page: number): Promise<IPessoa[] | Error> => {
    
  try {
    const results = await Knex(ETableNames.pessoa)
      .select("*")
      .whereLike("nomeCompleto", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return results;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
  }
};