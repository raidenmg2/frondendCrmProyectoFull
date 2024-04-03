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
    usuario?: UsuarioCreadorInterface
    }
    