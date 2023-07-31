import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


export const getAll = async (filter: string, limit: number, page: number, id = 0): Promise<ICidade[] | Error> => {

  try {
    const results = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", Number(id))
      .orWhereLike("nome", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && results.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select("*")
        .where("id", "=", id)
        .first(); 
      
      if (resultById) return [ ...results, resultById ];
    }

    return results;
  } catch (error) {
    return new Error("Erro ao realizar solicitação");
  }


};