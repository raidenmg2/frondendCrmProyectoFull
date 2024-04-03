export class UsuarioModel {
    constructor(
      public readonly _id: string,
      public nombres: string,
      public apellidos: string,
      public fechaNacimiento: string,
      public ciudadNacimiento: string,
      public tipoDocumento: string,
      public numeroDocumento: string,
      public paisExpedicion: string,
      public ciudadExpedicion: string,
      public fechaExpedicion: string,
      public estadoCivil: string,
      public direccion: string,
      public ciudadResidencia: string,
      public departamentoResidencia: string,
      public telefono: number,
      public email: string,
      public login: string,
      public rol: string,
      public estado?: boolean,
      public createdAt?: Date,
      public password?: string
    ) {}
  }