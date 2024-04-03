import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioInfoLogin } from '../../../core/interface/usuario-info-login.interface';
import { config } from '../../../../environments/configuration/config';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { CdkStepperModule } from '@angular/cdk/stepper';
@Component({
  selector: 'app-info-login-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CdkStepperModule],
  templateUrl: './info-login-usuarios.component.html',
  styleUrl: './info-login-usuarios.component.css',
})
export class InfoLoginUsuariosComponent implements OnInit {
  roles = config.roles
  enviarFormulario: any;
  InformacionLoginForm: FormGroup;
  usuarioSelecionado: UsuarioModel;

  @Output() valoresFormulario: EventEmitter<UsuarioInfoLogin> =
    new EventEmitter<UsuarioInfoLogin>();

  constructor(private fb: FormBuilder,private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.InformacionLoginForm = this.fb.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
      
    });
  }

  crearInformacionLogin(){
    const usuarioNuevoInfoLogin = this.InformacionLoginForm.value;
    if (this.InformacionLoginForm) {
      const data: UsuarioInfoLogin = {
        login: usuarioNuevoInfoLogin.login || '',
        password: usuarioNuevoInfoLogin.password || '',
        rol: usuarioNuevoInfoLogin.rol || '',
      }

      this.enviarFormulario.emit(this.InformacionLoginForm.value);
      console.log('datos', this.InformacionLoginForm.value);
    }
  }

submitInformacionLogin(){
console.log('informacion', this.InformacionLoginForm);
this.valoresFormulario.emit(this.InformacionLoginForm.value)

}
resetearFormulario(){
this.InformacionLoginForm.reset();

}
 
buscarUsuario(id: string) {
  if (id !== 'nuevo') {
    this.UsuarioServise.getUnUsuario(id).subscribe({
      next: (resp: any) => {
        const {
          login,
          password,
          rol,       
          
        } = resp.usuario;
        this.usuarioSelecionado = resp.usuario;

        this.InformacionLoginForm.setValue({
          login: login,
          password:password,
          rol:rol,
       
        });
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

}
