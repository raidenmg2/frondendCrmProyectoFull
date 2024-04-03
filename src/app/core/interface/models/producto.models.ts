import { Schema } from "express-validator";
import { CaracteristicasTecnicasInterface } from "../producto-info-caracteristicas-tecnicas.interface";
import { UsuarioCreadorInterface } from "../usuarios";
import { CaracterisiticasFisicasInterface } from "../producto-info-caracteristicas-fisicas.interface";
import { DistribuidorInterface } from "../producto-info-distribuidor.interface";

export class ProductoModel {
    constructor(
      public readonly _id: string,
      public nombre: string,
      public descripcion: string,
      public precio: number,
      public categoria: string,
      public caracteristicasTecnicas: CaracteristicasTecnicasInterface,
      public caracteristicasFiscas: CaracterisiticasFisicasInterface,
      public distribuidor: DistribuidorInterface,      
      public usuario?: UsuarioCreadorInterface,
      public estado?: boolean,
      public createdAt?: Date,
      
    ) {}
  }