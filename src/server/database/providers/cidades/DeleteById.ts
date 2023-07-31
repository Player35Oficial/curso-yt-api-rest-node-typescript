import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id: number): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.cidade).where("id", "=", id).del();
    console.log(result);
    if (result > 0) return; 
    return new Error("Erro ao Excluir registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao Excluir registro");
  }

};