import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";



export const updateById = async (id: number, data: object) => {

  try {
    
    const result = await Knex(ETableNames).where("id", "=", id).update(data);
    if (typeof result !== "number") {
      return new Error ("Registro não encontrado");
    }
    return result;

  } catch (error) {
    return new Error("Erro ao realizar solicitação");
  }

};