export class ClienteModel {
    constructor(
      
    //   public readonly _id: number,
     public nombres: String,
     public apellidos:String,
     public fechaNacimiento: String,
     public ciudadNacimiento: String,
     public tipoDocumento: String,
     public numeroDocumento: String,
     public paisExpedicion: String,
     public ciudadExpedicion: String,
     public fechaExpedicion: String,
     public estadoCivil:String,
     public direccion: String,
     public ciudadResidencia:String,
     public departamentoResidencia: String,
     public telefono: Number,
     public email:String,
     public actividadEconomica:String,
     public estado?:boolean,
     public createAt?:Date,
     public updatedAt?: Date,
    ) {}
  }
  