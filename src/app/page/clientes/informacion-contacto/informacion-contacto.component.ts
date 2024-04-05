import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClientesInfoContacto } from '../../../core/interface/clientes-info-contacto';
import { ActivatedRoute } from '@angular/router';

import { ClienteModel } from '../../../core/interface/models/clientes.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-contacto',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './informacion-contacto.component.html',
  styleUrl: './informacion-contacto.component.css',
})
export class InformacionContactoComponent implements OnInit {
  enviarFormulario: any;

  informacionContactoForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<ClientesInfoContacto> =
  new EventEmitter<ClientesInfoContacto>();
  clienteSelecionado: ClienteModel;

  constructor(private fb: FormBuilder,private clienteService: ClientesService,
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
      this.buscarCliente(id);
      
    });
  }

  crearinformacionContacto() {
    const clienteNuevo = this.informacionContactoForm.value;
    if (this.informacionContactoForm.valid) {
      const data: ClientesInfoContacto = {
        direccion: clienteNuevo.direccion || '',
        ciudadResidencia: clienteNuevo.ciudadResidencia || '',
        departamentoResidencia: clienteNuevo.departamentoResidencia || '',
        telefono: Number(clienteNuevo.telefono),
        email: clienteNuevo.email || '',
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

  buscarCliente(id: string) {
    if (id !== 'nuevo') {
      this.clienteService.getUnCliente(id).subscribe({
        next: (resp: any) => {
          const {
            direccion,
            ciudadResidencia,
            departamentoResidencia,
            telefono,
            email,
          
            
          } = resp.clientes;
          this.clienteSelecionado = resp.clientes;

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
            title: 'Error al buscar el cliente',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }
}
