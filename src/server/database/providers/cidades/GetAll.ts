import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const getAll = async (filter: string, limit: number, page: number) => {

  try {
    const results = await Knex(ETableNames.cidade).select("*").from("cidade").whereLike("nome", `%${filter}%`).limit(limit).offset(page != 1 || page > 0 ? (page - 1) : page * limit);
    if (results.length == 0) {
      return new Error("Nenhum registro encontrado");
    } else {
      return results;
    }
  } catch (error) {
    return new Error("Erro ao realizar solicitação");
  }


};