import { Schema } from "express-validator";

export class OportunidadModel {
    constructor(
      public readonly _id: string,
      public oportunidad: string,
      public cliente: object,
      public producto: object,
      public gestion: string,
      public usuario?: Schema,
      public createdAt?: Date,
      
    ) {}
  }