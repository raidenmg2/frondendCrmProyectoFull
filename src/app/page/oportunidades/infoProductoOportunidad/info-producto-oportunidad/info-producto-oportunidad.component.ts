import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OportunidadModel } from '../../../../core/interface/models/oportunidad.models';
import { ProductoInfoBasicaInterface } from '../../../../core/interface/producto-info-basica.interface';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { ProductosService } from '../../../../services/productos/productos.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-producto-oportunidad',
  standalone: true,
  imports: [
    CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './info-producto-oportunidad.component.html',
  styleUrl: './info-producto-oportunidad.component.css',
})
export class InfoProductoOportunidadComponent {
  enviarFormulario: any;
  usuarioSelecionado: OportunidadModel;
  informacionProductoOportunidadForm: FormGroup;
  productos: ProductoInfoBasicaInterface[] = [];
  usuarioSubscription: Subscription;

  @Output() valoresFormulario: EventEmitter<ProductoInfoBasicaInterface> =
    new EventEmitter<ProductoInfoBasicaInterface>();

  constructor(
    private fb: FormBuilder,
    private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.informacionProductoOportunidadForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    });

    this.usuarioSubscription = this.productoService
      .getProductos()
      .subscribe((resp: any) => {
        this.productos = resp.productos;
      });
    this.cargarProductos();
  }

  crearInfoProductoOportunidad() {
    const productoNuevo = this.informacionProductoOportunidadForm.value;
    if (this.informacionProductoOportunidadForm.valid) {
      const data: ProductoInfoBasicaInterface = {
        nombre: productoNuevo.tipoControles || '',
        precio: productoNuevo.color || '',
        categoria: productoNuevo.puertosConectividad || '',
      };

      this.enviarFormulario.emit(this.informacionProductoOportunidadForm.value);
      console.log('datos', this.informacionProductoOportunidadForm.value);
    }
  }

  submitInformacionProductoOportunidad() {
    console.log('información', this.informacionProductoOportunidadForm);
    this.valoresFormulario.emit(this.informacionProductoOportunidadForm.value);
  }

  resetearFormulario() {
    this.informacionProductoOportunidadForm.reset();
  }

  cargarProductos() {
    this.usuarioSubscription = this.productoService
      .getProductos()
      .subscribe((resp: any) => {
        this.productos = resp.productos;
      });
  }

  buscarCliente(nombre: string) {
    const productoEncontrado = this.productos.find(
      (producto) => producto.nombre === nombre
    );
    if (productoEncontrado) {
      this.informacionProductoOportunidadForm.setValue({
        nombre: productoEncontrado.nombre,
        precio: productoEncontrado.precio,
        categoria: productoEncontrado.categoria,
      });
    } else {
      Swal.fire({
        title: 'El producto no existe en la base de datos ',
        icon: 'error',
      });
    }
  }
}
