import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const getAll = async (
  filter: string, 
  limit: number, 
  page: number, 
  id = 0): Promise<IPessoa[] | Error> => {
    
  try {
    const results = await Knex(ETableNames.pessoa)
      .select("*")
      .where("id", Number(id))
      .orWhereLike("nomeCompleto", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && results.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.pessoa)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [ ...results, resultById ];
    }

    return results;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao realizar solicitação");
  }
};