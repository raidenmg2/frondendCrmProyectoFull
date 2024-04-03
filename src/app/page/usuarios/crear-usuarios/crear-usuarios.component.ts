import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { StepperComponent } from '../../../stepper/stepper.component';
import { InfoBasicaUsuariosComponent } from '../info-basica-usuarios/info-basica-usuarios.component';
import { InfoContactoUsuariosComponent } from '../info-contacto-usuarios/info-contacto-usuarios.component';
import { InfoLoginUsuariosComponent } from '../info-login-usuarios/info-login-usuarios.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { InfoLoginUsuariosFinFormularioComponent } from '../info-login-usuarios-fin-formulario/info-login-usuarios-fin-formulario.component';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuariosFormularioInterface } from '../../../core/interface/usuarioFormulario.interface';
import { UsuarioInfoBasica } from '../../../core/interface/usuario-info-basica.interface';
import { UsuarioInfoContacto } from '../../../core/interface/usuario-info-contacto.interface';
import { UsuarioInfoLogin } from '../../../core/interface/usuario-info-login.interface';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  imports: [
    HeaderComponent,
    RouterLink,
    StepperComponent,
    InfoBasicaUsuariosComponent,
    InfoContactoUsuariosComponent,
    InfoLoginUsuariosComponent,
    CdkStepperModule,
    InfoLoginUsuariosFinFormularioComponent,
  ],
})
export class CrearUsuariosComponent implements OnInit {
  @ViewChild(InfoBasicaUsuariosComponent)
  informacionBasicaComponent: InfoBasicaUsuariosComponent;
  @ViewChild(InfoContactoUsuariosComponent)
  informacionContactoComponent: InfoContactoUsuariosComponent;
  @ViewChild(InfoLoginUsuariosComponent)
  informacionLoginComponent: InfoLoginUsuariosComponent;

  valoresFormBasico: UsuarioInfoBasica;
  valoresFormContacto: UsuarioInfoContacto;
  valoresFormLogin: UsuarioInfoLogin;
  get ROUTER_APP() {
    return ROUTER_APP;
  }

  constructor(private usuariosServise: UsuariosService) {}
  ngOnInit(): void {}

  crearUsuario() {
    const data: UsuariosFormularioInterface = {      
      nombres: this.valoresFormBasico.nombres || '',
      apellidos: this.valoresFormBasico.apellidos || '',
      fechaNacimiento: this.valoresFormBasico.fechaNacimiento || '',
      ciudadNacimiento: this.valoresFormBasico.ciudadNacimiento || '',
      tipoDocumento: this.valoresFormBasico.tipoDocumento || '',
      numeroDocumento: this.valoresFormBasico.numeroDocumento || '',
      paisExpedicion: this.valoresFormBasico.paisExpedicion || '',
      ciudadExpedicion: this.valoresFormBasico.ciudadExpedicion || '',
      fechaExpedicion: this.valoresFormBasico.fechaExpedicion || '',
      estadoCivil: this.valoresFormBasico.estadoCivil || '',
      direccion: this.valoresFormContacto.direccion || '',
      ciudadResidencia: this.valoresFormContacto.ciudadResidencia || '',
      departamentoResidencia: this.valoresFormContacto.departamentoResidencia || '',
      telefono: Number(this.valoresFormContacto.telefono),
      email: this.valoresFormContacto.email || '',
      login: this.valoresFormLogin.login || '',
      password: this.valoresFormLogin.password || '',
      rol: this.valoresFormLogin.rol || '',
    };
    console.log('Estos son los Datos completos', data);
    this.usuariosServise.crearUsuarios(data).subscribe({
      next: (resp: any) => {
        console.log('Usuario Creado', resp);
        Swal.fire({
          title: 'Usuario creado  ',
          text: `El usuario ${this.valoresFormBasico.nombres} ha sido creado con éxito.`,
          icon: 'success',
        });
        this.informacionBasicaComponent.resetearFormulario();
        this.informacionContactoComponent.resetearFormulario();
        this.informacionLoginComponent.resetearFormulario();
      },
      error: (error: any) => {
        Swal.fire({
          title: 'No se pudo crear el usuario ',
          icon: 'error',
        });
      },
    });
  }

  recibirInfoBasicaUsuario(valores: UsuarioInfoBasica) {
    console.log('estos son los valores', valores);
    this.valoresFormBasico = valores;
  }
  recibirInfoContactoUsuario(valores: UsuarioInfoContacto) {
    console.log('estos son los valores', valores);
    this.valoresFormContacto = valores;
  }

  recibirInfoLoginUsuario(valores: UsuarioInfoLogin) {
    console.log('estos son los valores', valores);
    this.valoresFormLogin = valores;
  }
}
