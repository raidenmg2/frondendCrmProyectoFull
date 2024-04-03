export interface ClientesFormularioInterface {
    /** se definien las propiedades del objeto en este caso la interface */

nombres: String;
apellidos:String;
fechaNacimiento: String;
ciudadNacimiento: String;
tipoDocumento: String;
numeroDocumento: String;
paisExpedicion: String;
ciudadExpedicion: String;
fechaExpedicion: String;
estadoCivil:String;
direccion: String;
ciudadResidencia:String
departamentoResidencia: String;
telefono: Number;
email:String;
actividadEconomica:String;
estado?:boolean;

    }