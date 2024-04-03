import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { UsuarioInfoBasica } from '../../../core/interface/usuario-info-basica.interface';
import { UsuarioInfoContacto } from '../../../core/interface/usuario-info-contacto.interface';
import { UsuarioInfoLogin } from '../../../core/interface/usuario-info-login.interface';
import { UsuariosFormularioInterface } from '../../../core/interface/usuarioFormulario.interface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { InfoBasicaUsuariosComponent } from '../info-basica-usuarios/info-basica-usuarios.component';
import { InfoContactoUsuariosComponent } from '../info-contacto-usuarios/info-contacto-usuarios.component';
import { InfoLoginUsuariosComponent } from '../info-login-usuarios/info-login-usuarios.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StepperComponent } from '../../../stepper/stepper.component';
import { InfoLoginUsuariosFinFormularioComponent } from '../info-login-usuarios-fin-formulario/info-login-usuarios-fin-formulario.component';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';

@Component({
    selector: 'app-editar-usuarios',
    standalone: true,
    templateUrl: './editar-usuarios.component.html',
    styleUrl: './editar-usuarios.component.css',
    imports: [HeaderComponent,RouterLink,
        StepperComponent,
        InfoBasicaUsuariosComponent,
        InfoContactoUsuariosComponent,
        InfoLoginUsuariosComponent,
        CdkStepperModule,
        InfoLoginUsuariosFinFormularioComponent,]
})
export class EditarUsuariosComponent {
    @ViewChild(InfoBasicaUsuariosComponent)
    informacionBasicaComponent: InfoBasicaUsuariosComponent;
    @ViewChild(InfoContactoUsuariosComponent)
    informacionContactoComponent: InfoContactoUsuariosComponent;
    @ViewChild(InfoLoginUsuariosComponent)
    informacionLoginComponent: InfoLoginUsuariosComponent;
   
    valoresFormBasico: UsuarioInfoBasica;
    valoresFormContacto: UsuarioInfoContacto;
    valoresFormLogin: UsuarioInfoLogin;
  usuarioSelecionado: any;


    get ROUTER_APP() {
      return ROUTER_APP;
    }
  
    constructor(private usuariosServise: UsuariosService,private activatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(({ id }) => {
        this.buscarUsuario(id);
      });
    }


    buscarUsuario(id: string) {
      if (id !== 'nuevo') {
        this.usuariosServise.getUnUsuario(id).subscribe({
          next: (resp: any) => {
            const {
              nombres,
              apellidos,
              fechaNacimiento,
              ciudadNacimiento,
              tipoDocumento,
              numeroDocumento,
              paisExpedicion,
              ciudadExpedicion,
              fechaExpedicion,
              estadoCivil,
            } = resp.usuario;
            this.usuarioSelecionado = resp.usuario;
  
            console.log(
              'Valor id usuario seleccionado metodo buscar',
              this.usuarioSelecionado._id
            );
  
           
          },
  
          //errores
          error: (error: any) => {
            const errors = error?.error?.errors;
            const errorList: string[] = [];
  
            if (errors) {
              Object.entries(errors).forEach(([key, value]: [string, any]) => {
                if (value && value['msg']) {
                  errorList.push('* ' + value['msg'] + '<br>');
                }
              });
            }
  
            Swal.fire({
              title: 'Error al buscar el usuario',
              icon: 'error',
              html: `${errorList.length ? errorList.join('') : error.error.msg}`,
            });
          },
        });
      }
    }
  

    
    actualizarUsuario() {
      
      const dataActualizada: UsuarioModel = {
          _id: this.usuarioSelecionado._id,
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
      console.log('Datos editados', dataActualizada)
      this.usuariosServise.actualizarUnUsuario(dataActualizada).subscribe({
        next: (resp: any) => {
          Swal.fire(
            'Usuario Actualizado',
            `El usuario se actualizó satisfactoriamente`,
            'success'
          );
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];
  
          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }
  
          Swal.fire({
            title: 'Error al actualizar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  
    recibirInfoBasicaUsuario(valores: UsuarioInfoBasica) {
      console.log('estos son los valores', valores);
      console.log('este es el valor del id', valores._id);
      console.log('este es el valor del nombre', valores.nombres);
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
