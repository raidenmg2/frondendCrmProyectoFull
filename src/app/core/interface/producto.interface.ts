import { CaracterisiticasFisicasInterface } from "./producto-info-caracteristicas-fisicas.interface";
import { CaracteristicasTecnicasInterface } from "./producto-info-caracteristicas-tecnicas.interface";
import { DistribuidorInterface } from "./producto-info-distribuidor.interface";
import { UsuarioCreadorInterface } from "./usuarios";

export interface ProductoInterface {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tipoControles: string;
  color: string;
  puertosConectividad: string;
  dimensiones: string;
  peso: string;
  procesador: string;
  memoriaRam: string;
  almacenamiento: string;
  conectividad: string;
  resolucionImagen: string;
  razonSocial: string;
  nit: string;
  telefono: number;
  direccion: string;
}

export interface CrearProductoInterface {

    
     nombre: string,
     descripcion: string,
     precio: number,
     categoria: string,
     caracteristicasTecnicas: CaracteristicasTecnicasInterface,
     caracteristicasFiscas: CaracterisiticasFisicasInterface,
     distribuidor: DistribuidorInterface,      
     usuario?: UsuarioCreadorInterface,
     
  
}