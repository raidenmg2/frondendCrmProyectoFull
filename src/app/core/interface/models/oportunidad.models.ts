import { Schema } from "express-validator";
import { ClientesInfoBasicaOportunidadInterface } from "../clienteInfoOportunidad.Interface";
import { ProductoInfoBasicaInterface } from "../producto-info-basica.interface";

export class OportunidadModel {
    constructor(
      public readonly _id: string,
      public oportunidad: string,
      public cliente: ClientesInfoBasicaOportunidadInterface,
      public producto: ProductoInfoBasicaInterface,
      public gestion: string,
      public usuario?: Schema,
      public createdAt?: Date,
      
    ) {}
  }