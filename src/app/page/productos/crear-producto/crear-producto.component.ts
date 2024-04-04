import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from '../../../stepper/stepper.component';
import { RouterLink } from '@angular/router';
import { InfoBasicaProductoComponent } from '../info-basica-producto/info-basica-producto.component';
import { InfoCaracteristicasFisicasComponent } from '../info-caracteristicas-fisicas/info-caracteristicas-fisicas.component';
import { InfoCaracteristicasTecnicasComponent } from '../info-caracteristicas-tecnicas/info-caracteristicas-tecnicas.component';
import { InfoDistribuidorComponent } from '../info-distribuidor/info-distribuidor.component';
import { ProductoInfoBasicaInterface } from '../../../core/interface/producto-info-basica.interface';
import { CaracterisiticasFisicasInterface } from '../../../core/interface/producto-info-caracteristicas-fisicas.interface';
import { CaracteristicasTecnicasInterface } from '../../../core/interface/producto-info-caracteristicas-tecnicas.interface';
import { DistribuidorInterface } from '../../../core/interface/producto-info-distribuidor.interface';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { ProductosService } from '../../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { FinFormProductoComponent } from '../fin-form-producto/fin-form-producto.component';
import { CrearProductoInterface } from '../../../core/interface/producto.interface';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  imports: [
    HeaderComponent,
    RouterLink,
    StepperComponent,
    CdkStepperModule,
    InfoBasicaProductoComponent,
    InfoCaracteristicasFisicasComponent,
    InfoCaracteristicasTecnicasComponent,
    InfoDistribuidorComponent,
    FinFormProductoComponent,
  ],
})
export class CrearProductoComponent implements OnInit {
  @ViewChild(InfoBasicaProductoComponent)
  informacionBasicaComponent: InfoBasicaProductoComponent;
  @ViewChild(InfoCaracteristicasFisicasComponent)
  informacionCaracteristicasFisicasComponent: InfoCaracteristicasFisicasComponent;
  @ViewChild(InfoCaracteristicasTecnicasComponent)
  informacionCaracteristicasTecnicasComponent: InfoCaracteristicasTecnicasComponent;
  @ViewChild(InfoDistribuidorComponent)
  informacionDistribuidorComponent: InfoDistribuidorComponent;

  valoresFormBasico: ProductoInfoBasicaInterface;
  valoresFormCaracteristicasFisicas: CaracterisiticasFisicasInterface;
  valoresFormCaracteristicasTecnicas: CaracteristicasTecnicasInterface;
  valoresFormDistribuidor: DistribuidorInterface;

  get ROUTER_APP() {
    return ROUTER_APP;
  }
  constructor(private productoServise: ProductosService) {}
  ngOnInit(): void {}

  crearProducto() {
    const data: CrearProductoInterface = {
      nombre:this.valoresFormBasico.nombre || '',
      descripcion: this.valoresFormBasico.descripcion || '',
      precio: Number(this.valoresFormBasico.precio),
      categoria: this.valoresFormBasico.categoria || '',
      caracteristicasTecnicas: this.valoresFormCaracteristicasTecnicas,
      caracteristicasFiscas: this.valoresFormCaracteristicasFisicas,
      distribuidor: this.valoresFormDistribuidor
    
    };

    console.log('Estos son los Datos completos', data);
    this.productoServise.crearProducto(data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: 'producto creado  ',
          text: `El producto ${this.valoresFormBasico.nombre} ha sido creado con éxito.`,
          icon: 'success',
        });
        this.informacionBasicaComponent.resetearFormulario();
        this.informacionCaracteristicasFisicasComponent.resetearFormulario();
        this.informacionCaracteristicasTecnicasComponent.resetearFormulario();
        this.informacionDistribuidorComponent.resetearFormulario();
      },
      error: (error: any) => {
        Swal.fire({
          title: 'No se pudo crear el Producto ',
          icon: 'error',
        });
      },
    });
  }

  recibirInfoBasicaProducto(valores: ProductoInfoBasicaInterface) {
    console.log('estos son los valores', valores);
    this.valoresFormBasico = valores;
  }
  recibirInfoCaracteristicasFisicas(valores: CaracterisiticasFisicasInterface) {
    console.log('estos son los valores', valores);
    this.valoresFormCaracteristicasFisicas = valores;
  }

  recibirInfoCaracteristicasTecnicas(
    valores: CaracteristicasTecnicasInterface
  ) {
    console.log('estos son los valores', valores);
    this.valoresFormCaracteristicasTecnicas = valores;
  }
  recibirInfoDistribuidor(valores: DistribuidorInterface) {
    console.log('estos son los valores', valores);
    this.valoresFormDistribuidor = valores;
  }
}
