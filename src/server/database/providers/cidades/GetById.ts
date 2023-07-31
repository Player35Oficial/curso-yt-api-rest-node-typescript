import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const getById = async (id: number) => {

  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;
      
    return new Error ("Registro não encontrado");
    
  } catch (error) {
    console.log(error);
    return new Error ("Erro ao realizar solicitação");
  }
};
