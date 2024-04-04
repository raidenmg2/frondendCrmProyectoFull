import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoModel } from '../../../../core/interface/models/producto.models';
import { OportunidadInfoBasicaInterface } from '../../../../core/interface/oportunidad.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-info-oportunidad',
  standalone: true,
  imports: [CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,RouterLink],
  templateUrl: './info-oportunidad.component.html',
  styleUrl: './info-oportunidad.component.css'
})
export class InfoOportunidadComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: ProductoModel;
  informacionOportunidadForm: FormGroup;

  @Output() valoresFormulario: EventEmitter<OportunidadInfoBasicaInterface> =
  new EventEmitter<OportunidadInfoBasicaInterface>();

  constructor(private fb: FormBuilder,) {}

    ngOnInit(): void {
      this.informacionOportunidadForm = this.fb.group({
        oportunidad: ['', Validators.required],
        gestion: ['', Validators.required],
        
      });

}

crearInfoOportunidad() {
  const nuevaOportunidad = this.informacionOportunidadForm.value;
  if (this.informacionOportunidadForm.valid) {
    const data: OportunidadInfoBasicaInterface = {
      oportunidad: nuevaOportunidad.oportunidad || '',
      gestion: nuevaOportunidad.gestion || '',      
    };
    console.log('datos', this.informacionOportunidadForm.value);
    this.enviarFormulario.emit(this.informacionOportunidadForm?.value);
    console.log('datos', this.informacionOportunidadForm.value);
  }
}

submitInformacionOportunidad() {
  console.log('información', this.informacionOportunidadForm.value);
  this.valoresFormulario.emit(this.informacionOportunidadForm.value);
}

resetearFormulario() {
  this.informacionOportunidadForm.reset();
}


}