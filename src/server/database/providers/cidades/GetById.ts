import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const getById = async (id: number) => {

  try {
    const result = await Knex(ETableNames.cidade).select("*").where("id", "=", id);
    if (result.length == 0) {
      return new Error ("Registro não encontrado");
    }
    return result;
  } catch (error) {
    return new Error ("Erro ao realizar solicitação");
  }
};
