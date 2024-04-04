import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import {FormsModule,ReactiveFormsModule,} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../../../core/enum/router-app.enum';
import { OportunidadInfoBasicaInterface, OportunidadInterface } from '../../../../core/interface/oportunidad.interface';
import { OportunidadesService } from '../../../../services/oportunidades/oportunidades.service';
import Swal from 'sweetalert2';
import { ClientesInfoBasicaOportunidadInterface } from '../../../../core/interface/clienteInfoOportunidad.Interface';
import { ProductoInfoBasicaInterface } from '../../../../core/interface/producto-info-basica.interface';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from '../../../../stepper/stepper.component';
import { InfoClienteOportunidadComponent } from '../../info-cliente-oportunidad/info-cliente-oportunidad.component';
import { InfoProductoOportunidadComponent } from '../../infoProductoOportunidad/info-producto-oportunidad/info-producto-oportunidad.component';
import { FinOportunidadComponent } from '../../finOportunidad/fin-oportunidad/fin-oportunidad.component';
import { InfoOportunidadComponent } from '../../infoOportunidad/info-oportunidad/info-oportunidad.component';

@Component({
    selector: 'app-crear-oportunidades',
    standalone: true,
    templateUrl: './crear-oportunidades.component.html',
    styleUrl: './crear-oportunidades.component.css',
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
    imports: [HeaderComponent, ReactiveFormsModule, RouterLink, FormsModule, StepperComponent,
        CdkStepperModule, InfoClienteOportunidadComponent, InfoProductoOportunidadComponent, FinOportunidadComponent, InfoOportunidadComponent]
})
export class CrearOportunidadesComponent implements OnInit {

  @ViewChild(InfoClienteOportunidadComponent)
  informacionClienteOportunidadComponent: InfoClienteOportunidadComponent;
  @ViewChild(InfoProductoOportunidadComponent)
  informacionProductoOportunidadComponent: InfoProductoOportunidadComponent;
  @ViewChild(InfoOportunidadComponent)
  informacionOportunidadComponent: InfoOportunidadComponent;
  


  valoresFormBasicoOportunidad: OportunidadInfoBasicaInterface;
  valoresFormClienteOportunidad: ClientesInfoBasicaOportunidadInterface;
  valoresFormProductoOportunidad: ProductoInfoBasicaInterface;


  get ROUTER_APP() {
    return ROUTER_APP;
  }

  
  constructor(private oportunidadServise: OportunidadesService) {}
  ngOnInit(): void {}

  crearOportunidad() {
    const data: OportunidadInterface = {      
        oportunidad: this.valoresFormBasicoOportunidad.oportunidad || '',
        gestion: this.valoresFormBasicoOportunidad.gestion || '',    
        cliente: this.valoresFormClienteOportunidad ,
        producto: this.valoresFormProductoOportunidad ,
    };
    console.log('Estos son los Datos completos', data);
    this.oportunidadServise.crearoportunidad(data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: 'Oportunidad creada  ',
          text: `La oportunidad de  ${this.valoresFormBasicoOportunidad.oportunidad} ha sido creada con éxito.`,
          icon: 'success',
        });
        this.informacionClienteOportunidadComponent.resetearFormulario();
        this.informacionProductoOportunidadComponent.resetearFormulario();
        this.informacionOportunidadComponent.resetearFormulario();
      
      },
      error: (error: any) => {
        Swal.fire({
          title: 'No se pudo crear el Producto ',
          icon: 'error',
        });
      },
    });
  }

  recibirInfoBasicaOportunidad(valores: OportunidadInfoBasicaInterface) {
    console.log('estos son los valores', valores);
    this.valoresFormBasicoOportunidad = valores;
  }
  recibirInfoClienteOportunidad(valores: ClientesInfoBasicaOportunidadInterface) {
    console.log('estos son los valores', valores);
    this.valoresFormClienteOportunidad = valores;
  }

  recibirInfoProductoOportunidad(
    valores: ProductoInfoBasicaInterface
  ) {
    console.log('estos son los valores', valores);
    this.valoresFormProductoOportunidad = valores;
  }
 
}

  // clientes: ClientesInfoBasicaOportunidadInterface[] = [];
  // productos: ProductoInfoBasicaInterface[] = [];
  // oportunidadComercialForm: FormGroup;
  // usuarioSubscription: Subscription;

  // get ROUTER_APP() {
  //   return ROUTER_APP;
  // }

  // constructor(
  //   private fb: FormBuilder,
  //   private oportunidadesService: OportunidadesService,
  //   private clienteService: ClientesService,
  //   private productoService: ProductosService,
  // ) {}

  // ngOnInit(): void {
  //   this.oportunidadComercialForm = this.fb.group({
  //     oportunidad: new FormControl('',[ Validators.required]),
  //     cliente: new FormControl('',[ Validators.required]),
  //     producto:new FormControl('',[ Validators.required]),
  //     gestion:new FormControl('', [Validators.required]),
  //   });


  // this.getClientes();
  // this.cargarProductos();


  // }

  // crearOportinidad() {
  //   const oportunidadNueva = this.oportunidadComercialForm.value;
  //   if (this.oportunidadComercialForm.valid) {
  //     const data: OportunidadInterface = {
  //       oportunidad: oportunidadNueva.oportunidad || '',
  //       cliente: oportunidadNueva.cliente || '',
  //       producto: oportunidadNueva.producto || '',
  //       gestion: oportunidadNueva.gestion || '',
  //     };
  //     console.log('Esta es la info de la oportunidad', data)
  //     this.oportunidadesService.crearoportunidad(data).subscribe({
  //       next: (resp: any) => {
  //         Swal.fire({
  //           title: 'Oportunidad creada  ',
  //           text: `La oportunidad comercial  ha sido creada con éxito.`,
  //           icon: 'success',
  //         });
  //       },
  //       error: (error: any) => {
  //         Swal.fire({
  //           title: 'No se pudo crear el Producto ',
  //           icon: 'error',
  //         });
  //       },
  //     });
  //     this.resetForm();
  //   }
  // }

  // getClientes(){
  //   this.clienteService.getClientes().subscribe((resp: any)=>{
  //     this.clientes = resp.clientes;
  //   })
  // }



  // cargarProductos() {
  //   this.usuarioSubscription = this.productoService.getProductos()
  //     .subscribe((resp: any) => {
  //       this.productos = resp.productos;
                
  //     });
  // }


  // resetForm() {
  //   this.oportunidadComercialForm.reset(); 
  // }

