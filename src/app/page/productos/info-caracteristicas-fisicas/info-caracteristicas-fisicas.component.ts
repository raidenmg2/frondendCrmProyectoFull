import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoModel } from '../../../core/interface/models/producto.models';
import { CaracterisiticasFisicasInterface } from '../../../core/interface/producto-info-caracteristicas-fisicas.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-info-caracteristicas-fisicas',
  standalone: true,
  imports: [CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,],
  templateUrl: './info-caracteristicas-fisicas.component.html',
  styleUrl: './info-caracteristicas-fisicas.component.css'
})
export class InfoCaracteristicasFisicasComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: ProductoModel;
  informacionCaracteristicasFisicasForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<CaracterisiticasFisicasInterface> =
  new EventEmitter<CaracterisiticasFisicasInterface>();
  

  constructor(private fb: FormBuilder, private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.informacionCaracteristicasFisicasForm = this.fb.group({
      tipoControles: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      puertosConectividad: new FormControl('', [Validators.required]),
      dimensiones: new FormControl('', [Validators.required]),
      peso: new FormControl('', [ Validators.required]),
    });
  }

  crearCaracteristicasFisicas() {
    const productoNuevo = this.informacionCaracteristicasFisicasForm.value;
    if (this.informacionCaracteristicasFisicasForm.valid) {
      const data: CaracterisiticasFisicasInterface = {
        tipoControles: productoNuevo.tipoControles || '',
        color: productoNuevo.color || '',
        puertosConectividad: productoNuevo.puertosConectividad || '',
        dimensiones: productoNuevo.dimensiones || '',
        peso: productoNuevo.peso || '',
      };

      this.enviarFormulario.emit(this.informacionCaracteristicasFisicasForm.value);
      console.log('datos', this.informacionCaracteristicasFisicasForm.value);
    }
  }

  submitInformacionContacto() {
    console.log('información', this.informacionCaracteristicasFisicasForm);
    this.valoresFormulario.emit(this.informacionCaracteristicasFisicasForm.value);
  }

  resetearFormulario() {
    this.informacionCaracteristicasFisicasForm.reset();
  }

}
