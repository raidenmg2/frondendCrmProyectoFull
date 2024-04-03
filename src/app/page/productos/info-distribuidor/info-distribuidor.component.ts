import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoModel } from '../../../core/interface/models/producto.models';
import { DistribuidorInterface } from '../../../core/interface/producto-info-distribuidor.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-info-distribuidor',
  standalone: true,
  imports: [CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './info-distribuidor.component.html',
  styleUrl: './info-distribuidor.component.css'
})
export class InfoDistribuidorComponent implements OnInit{
  enviarFormulario: any;
  usuarioSelecionado: ProductoModel;

  informacionDistribuidorForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<DistribuidorInterface> =
  new EventEmitter<DistribuidorInterface>();

  constructor(private fb: FormBuilder, private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.informacionDistribuidorForm= this.fb.group({
      razonSocial: new FormControl('',[Validators.required]),
      nit: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
    });
  }


   crearInformacionDistribuidor(){
    const productoNuevo = this.informacionDistribuidorForm.value;
    if (this.informacionDistribuidorForm.valid) {
      const data: DistribuidorInterface ={
        nit: productoNuevo.nit || '',
        razonSocial: productoNuevo.razonSocial ||'',
        telefono: productoNuevo.telefono || '',
        direccion: productoNuevo.direccion || ''
      };

      this.enviarFormulario.emit(this.informacionDistribuidorForm.value);
    }
   }

   submitInformacionDistribuidor() {
    console.log('información', this.informacionDistribuidorForm);
    this.valoresFormulario.emit(this.informacionDistribuidorForm.value);
  }

  resetearFormulario() {
    this.informacionDistribuidorForm.reset();
  }
}
