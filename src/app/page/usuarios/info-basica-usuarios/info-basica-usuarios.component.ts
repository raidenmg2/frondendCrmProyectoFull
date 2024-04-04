import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import Swal from 'sweetalert2';
import { UsuarioInfoBasica } from '../../../core/interface/usuario-info-basica.interface';

@Component({
  selector: 'app-info-basica-usuarios',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './info-basica-usuarios.component.html',
  styleUrl: './info-basica-usuarios.component.css',
})
export class InfoBasicaUsuariosComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: UsuarioInfoBasica;
  informacionBasicaForm: FormGroup;

  valoresFormBasico: UsuarioInfoBasica;

  @Output() valoresFormulario: EventEmitter<UsuarioInfoBasica> =
    new EventEmitter<UsuarioInfoBasica>();

  @Output() valoresActualizadosFormulario: EventEmitter<UsuarioModel> =
    new EventEmitter<UsuarioModel>();

  constructor(
    private fb: FormBuilder,
    private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.informacionBasicaForm = this.fb.group({
      nombres: new FormControl('', Validators.required),
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ciudadNacimiento: ['', Validators.required],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      paisExpedicion: ['', [Validators.required]],
      ciudadExpedicion: ['', [Validators.required]],
      fechaExpedicion: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
    });
  }

  crearInformacionBasica() {
    const usuarioNuevoInfoBasica = this.informacionBasicaForm.value;
     if (this.informacionBasicaForm.valid) {
        const data: UsuarioInfoBasica = {
          nombres: usuarioNuevoInfoBasica.nombres || '',
          apellidos: usuarioNuevoInfoBasica.apellidos || '',
          fechaNacimiento: usuarioNuevoInfoBasica.fechaNacimiento || '',
          ciudadNacimiento: usuarioNuevoInfoBasica.ciudadNacimiento || '',
          tipoDocumento: usuarioNuevoInfoBasica.tipoDocumento || '',
          numeroDocumento: usuarioNuevoInfoBasica.numeroDocumento || '',
          paisExpedicion: usuarioNuevoInfoBasica.paisExpedicion || '',
          ciudadExpedicion: usuarioNuevoInfoBasica.ciudadExpedicion || '',
          fechaExpedicion: usuarioNuevoInfoBasica.fechaExpedicion || '',
          estadoCivil: usuarioNuevoInfoBasica.estadoCivil || '',
        };
        this.enviarFormulario.emit(this.informacionBasicaForm.value);

        console.log('datos', this.informacionBasicaForm.value);
      }
    
  }

  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.UsuarioServise.getUnUsuario(id).subscribe({
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
      

          this.informacionBasicaForm.setValue({
            nombres: nombres,
            apellidos: apellidos,
            fechaNacimiento: fechaNacimiento,
            ciudadNacimiento: ciudadNacimiento,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            paisExpedicion: paisExpedicion,
            ciudadExpedicion: ciudadExpedicion,
            fechaExpedicion: fechaExpedicion,
            estadoCivil: estadoCivil,
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

  actualizarUsuario() {
    console.log('valores id', this.usuarioSelecionado._id);
    const usuarioActualizado = this.informacionBasicaForm.value;

    const dataActualizada: UsuarioInfoBasica = {
      _id: this.usuarioSelecionado._id || '',
      nombres: usuarioActualizado.nombres || '',
      apellidos: usuarioActualizado.apellidos || '',
      fechaNacimiento: usuarioActualizado.fechaNacimiento || '',
      ciudadNacimiento: usuarioActualizado.ciudadNacimiento || '',
      tipoDocumento: usuarioActualizado.tipoDocumento || '',
      numeroDocumento: usuarioActualizado.numeroDocumento || '',
      paisExpedicion: usuarioActualizado.paisExpedicion || '',
      ciudadExpedicion: usuarioActualizado.ciudadExpedicion || '',
      fechaExpedicion: usuarioActualizado.fechaExpedicion || '',
      estadoCivil: usuarioActualizado.estadoCivil || '',
    };
    this.valoresFormBasico = dataActualizada;
    this.enviarFormulario.emit(this.valoresFormBasico._id);
  }

  submitInformacionBasica() {
    this.valoresFormulario.emit(this.informacionBasicaForm.value);
  }

  resetearFormulario() {
    this.informacionBasicaForm.reset();
  }
}
