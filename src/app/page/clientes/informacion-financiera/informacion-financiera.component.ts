import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ClientesInfoFinanciera } from '../../../core/interface/cliente-info-financiera';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [CdkStepper, CdkStepperModule, CdkStepper, CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-financiera.component.html',
  styleUrl: './informacion-financiera.component.css',
})
export class InformacionFinancieraComponent implements OnInit{
  enviarFormulario: any;
  informacionFinancieraForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<ClientesInfoFinanciera> =
  new EventEmitter<ClientesInfoFinanciera>();



  
  constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    this.informacionFinancieraForm = this.fb.group({
      actividadEconomica: new FormControl('', [Validators.required]),
    });
   
  }
  
  

  crearInformacionFinanciera() {
    const clienteNuevoInfoFinanciera = this.informacionFinancieraForm.value;
    if (this.informacionFinancieraForm.valid) {
      const data: ClientesInfoFinanciera = {
        actividadEconomica: clienteNuevoInfoFinanciera.actividadEconomica || '',
      };
      
      this.enviarFormulario.emit(this.informacionFinancieraForm.value);
      console.log('datos', this.informacionFinancieraForm.value);
    }
  }

  submitInformacionFinanciera() {
    console.log('información', this.informacionFinancieraForm);
    this.valoresFormulario.emit(this.informacionFinancieraForm.value);
  }

  resetearFormulario() {
    this.informacionFinancieraForm.reset();
  }
}
