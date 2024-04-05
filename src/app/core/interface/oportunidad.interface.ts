import { ClientesInfoBasicaOportunidadInterface } from "./clienteInfoOportunidad.Interface";
import { ProductoInfoBasicaInterface } from "./producto-info-basica.interface";
import { UsuarioCreadorInterface } from "./usuarios";

export interface OportunidadInterface {
    /** se definien las propiedades del objeto en este caso la interface */
    oportunidad: string,
    cliente: ClientesInfoBasicaOportunidadInterface,
    producto: ProductoInfoBasicaInterface,
    gestion: string,
     _id?: string,
    usuario?: UsuarioCreadorInterface,
    notasInteraccion?: string
    createdAt?: Date;
    
    }
    
    export interface OportunidadInfoBasicaInterface {
        /** se definien las propiedades del objeto en este caso la interface */
        oportunidad: string,        
        gestion: string,        
       
        }


        export interface gestionarOportunidadInterface{
            nuevaestion:string ,
            usuario: string ,
            notasInteraccion: string
        }
    