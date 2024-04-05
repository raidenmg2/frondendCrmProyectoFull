import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientesInfoBasica } from '../../../core/interface/cliente-info-basica.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import Swal from 'sweetalert2';
import { ClienteModel } from '../../../core/interface/models/clientes.models';

@Component({
  selector: 'app-informacion-basica',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './informacion-basica.component.html',
  styleUrl: './informacion-basica.component.css',
})
export class InformacionBasicaComponent implements OnInit {
  enviarFormulario: any;

  informacionBasicaForm: FormGroup;
  clienteSelecionado: any;
  valoresFormBasico: ClientesInfoBasica;
  
  
  @Output() valoresFormulario: EventEmitter<ClientesInfoBasica> =
    new EventEmitter<ClientesInfoBasica>();
 

  @Output() valoresActualizadosFormulario: EventEmitter<ClienteModel> =
    new EventEmitter<ClienteModel>();


  constructor(private fb: FormBuilder, private clienteService: ClientesService,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.informacionBasicaForm = this.fb.group({
      nombres: ['', Validators.required],
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
      this.buscarCliente(id);
    });
  }

  crearInformacionBasica() {
    const clienteNuevoInfoBasica = this.informacionBasicaForm.value;
    if (this.informacionBasicaForm.valid) {
      const data: ClientesInfoBasica = {
        nombres: clienteNuevoInfoBasica.nombres || '',
        apellidos: clienteNuevoInfoBasica.apellidos || '',
        fechaNacimiento: clienteNuevoInfoBasica.fechaNacimiento || '',
        ciudadNacimiento: clienteNuevoInfoBasica.ciudadNacimiento || '',
        tipoDocumento: clienteNuevoInfoBasica.tipoDocumento || '',
        numeroDocumento: clienteNuevoInfoBasica.numeroDocumento || '',
        paisExpedicion: clienteNuevoInfoBasica.paisExpedicion || '',
        ciudadExpedicion: clienteNuevoInfoBasica.ciudadExpedicion || '',
        fechaExpedicion: clienteNuevoInfoBasica.fechaExpedicion || '',
        estadoCivil: clienteNuevoInfoBasica.estadoCivil || '',
      };
      this.enviarFormulario.emit(this.informacionBasicaForm.value);

      console.log('datos', this.informacionBasicaForm.value);
    }
  }


  buscarCliente(id: string) {
    if (id !== 'nuevo') {
      this.clienteService.getUnCliente(id).subscribe({
        next: (resp: any) => {
          console.log('cliente',resp.cliente)
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
          } = resp.clientes;
          this.clienteSelecionado = resp.clientes;
      

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
    console.log('valores id', this.clienteSelecionado._id);
    const usuarioActualizado = this.informacionBasicaForm.value;

    const dataActualizada: ClientesInfoBasica = {
      _id: this.clienteSelecionado._id || '',
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
    console.log('información', this.informacionBasicaForm);
    this.valoresFormulario.emit(this.informacionBasicaForm.value);
  }

  resetearFormulario() {
    this.informacionBasicaForm.reset();
  }
}
