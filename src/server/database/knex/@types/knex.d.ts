import { ICidade } from "../../models/Cidade";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidade
    // pessoa: IPessoa
    // usuario: IUsuario
  }
}