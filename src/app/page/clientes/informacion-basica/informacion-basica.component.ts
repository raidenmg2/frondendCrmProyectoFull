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
import { RouterLink } from '@angular/router';

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
  @Output() valoresFormulario: EventEmitter<ClientesInfoBasica> =
    new EventEmitter<ClientesInfoBasica>();

  constructor(private fb: FormBuilder) {}

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

  submitInformacionBasica() {
    console.log('información', this.informacionBasicaForm);
    this.valoresFormulario.emit(this.informacionBasicaForm.value);
  }

  resetearFormulario() {
    this.informacionBasicaForm.reset();
  }
}
