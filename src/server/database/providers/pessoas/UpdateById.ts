import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const updateById = async (id: number, data: Omit<IPessoa, "id">): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.pessoa)
      .where("id", "=", id)
      .update(data);
    
    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }

};