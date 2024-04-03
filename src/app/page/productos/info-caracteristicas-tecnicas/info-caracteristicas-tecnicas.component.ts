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
import { ProductoModel } from '../../../core/interface/models/producto.models';
import { CaracteristicasTecnicasInterface } from '../../../core/interface/producto-info-caracteristicas-tecnicas.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-info-caracteristicas-tecnicas',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './info-caracteristicas-tecnicas.component.html',
  styleUrl: './info-caracteristicas-tecnicas.component.css',
})
export class InfoCaracteristicasTecnicasComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: ProductoModel;

  informacionCaracteristicasTecticasForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<CaracteristicasTecnicasInterface> =
    new EventEmitter<CaracteristicasTecnicasInterface>();

  constructor(
    private fb: FormBuilder,
    private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.informacionCaracteristicasTecticasForm = this.fb.group({
      procesador: new FormControl('', [Validators.required]),
      memoriaRam: new FormControl('', [Validators.required]),
      almacenamiento: new FormControl('', [Validators.required]),
      conectividad: new FormControl('', [Validators.required]),
      resolucionImagen: new FormControl('', [Validators.required]),
    });
  }

  crearinformacionContacto() {
    const productoNuevo = this.informacionCaracteristicasTecticasForm.value;
    if (this.informacionCaracteristicasTecticasForm.valid) {
      const data: CaracteristicasTecnicasInterface = {
        procesador: productoNuevo.procesador || '',
        memoriaRam: productoNuevo.memoriaRam || '',
        almacenamiento: productoNuevo.almacenamiento || '',
        conectividad: productoNuevo.conectividad || '',
        resolucionImagen: productoNuevo.resolucionImagen || '',
      };

      this.enviarFormulario.emit(this.informacionCaracteristicasTecticasForm.value);
      console.log('datos', this.informacionCaracteristicasTecticasForm.value);
    }
  }

  submitInformacionCarcteristicasTecnicas() {
    console.log('información', this.informacionCaracteristicasTecticasForm);
    this.valoresFormulario.emit(this.informacionCaracteristicasTecticasForm.value);
  }

  resetearFormulario() {
    this.informacionCaracteristicasTecticasForm.reset();
  }
}
