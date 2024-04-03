export interface ActualizarUsuarioInfoBasica {
    /** se definien las propiedades del objeto en este caso la interface */
        
    nombres: string;
    apellidos:string;
    fechaNacimiento: string;
    ciudadNacimiento: string;
    tipoDocumento: string;
    numeroDocumento: string;
    paisExpedicion: string;
    ciudadExpedicion: string;
    fechaExpedicion: string;
    estadoCivil:string;
    _id?: string;

}