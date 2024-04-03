import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesInfoContacto as UsuarioInfoContacto } from '../../../core/interface/clientes-info-contacto';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-contacto-usuarios',
  standalone: true,
  imports: [CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,],
  templateUrl: './info-contacto-usuarios.component.html',
  styleUrl: './info-contacto-usuarios.component.css'
})
export class InfoContactoUsuariosComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: UsuarioModel;

  informacionContactoForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<UsuarioInfoContacto> =
  new EventEmitter<UsuarioInfoContacto>();

  constructor(private fb: FormBuilder, private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.informacionContactoForm = this.fb.group({
      direccion: new FormControl('', [Validators.required]),
      ciudadResidencia: new FormControl('', [Validators.required]),
      departamentoResidencia: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
      
    });
  }

  crearinformacionContacto() {
    const usuarioNuevo = this.informacionContactoForm.value;
    if (this.informacionContactoForm.valid) {
      const data: UsuarioInfoContacto = {
        direccion: usuarioNuevo.direccion || '',
        ciudadResidencia: usuarioNuevo.ciudadResidencia || '',
        departamentoResidencia: usuarioNuevo.departamentoResidencia || '',
        telefono: Number(usuarioNuevo.telefono),
        email: usuarioNuevo.email || '',
      };

      this.enviarFormulario.emit(this.informacionContactoForm.value);
      console.log('datos', this.informacionContactoForm.value);
    }
  }

  submitInformacionContacto() {
    console.log('información', this.informacionContactoForm);
    this.valoresFormulario.emit(this.informacionContactoForm.value);
  }

  resetearFormulario() {
    this.informacionContactoForm.reset();
  }

  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.UsuarioServise.getUnUsuario(id).subscribe({
        next: (resp: any) => {
          const {
            direccion,
            ciudadResidencia,
            departamentoResidencia,
            telefono,
            email,
          
            
          } = resp.usuario;
          this.usuarioSelecionado = resp.usuario;

          this.informacionContactoForm.setValue({
            direccion:direccion,
            ciudadResidencia:ciudadResidencia,
            departamentoResidencia: departamentoResidencia,
            telefono: telefono,
            email: email,
         
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
