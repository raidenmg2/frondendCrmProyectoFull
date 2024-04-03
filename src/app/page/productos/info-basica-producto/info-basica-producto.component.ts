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
import { ProductoInfoBasicaInterface } from '../../../core/interface/producto-info-basica.interface';
import { ProductosService } from '../../../services/productos/productos.service';

@Component({
  selector: 'app-info-basica-producto',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './info-basica-producto.component.html',
  styleUrl: './info-basica-producto.component.css',
})
export class InfoBasicaProductoComponent implements OnInit {
  enviarFormulario: any;
  informacionBasicaForm: FormGroup;

  valoresFormBasico: ProductoInfoBasicaInterface;

  @Output() valoresFormulario: EventEmitter<ProductoInfoBasicaInterface> =
    new EventEmitter<ProductoInfoBasicaInterface>();

  constructor(
    private fb: FormBuilder,
    private ProductoServise: ProductosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.informacionBasicaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
    });
   
  }

  crearInformacionBasica() {
    const productoNuevoInfoBasica = this.informacionBasicaForm.value;
    if (this.informacionBasicaForm.valid) {
      const data: ProductoInfoBasicaInterface = {
        nombre: productoNuevoInfoBasica.nombre || '',
        descripcion: productoNuevoInfoBasica.descripcion || '',
        precio: productoNuevoInfoBasica.precio || '',
        categoria: productoNuevoInfoBasica.categoria || '',
      };
      this.enviarFormulario.emit(this.informacionBasicaForm.value);

      console.log('datos', this.informacionBasicaForm.value);
    }
  }

  submitInformacionBasica() {
    
    this.valoresFormulario.emit(this.informacionBasicaForm.value);
   
  }
  resetearFormulario() {
    this.informacionBasicaForm.reset();
  }
 
}
