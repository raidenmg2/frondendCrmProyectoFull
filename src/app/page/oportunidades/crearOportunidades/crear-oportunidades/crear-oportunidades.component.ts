import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../../../core/enum/router-app.enum';
import { OportunidadInterface } from '../../../../core/interface/oportunidad.interface';
import { OportunidadesService } from '../../../../services/oportunidades/oportunidades.service';
import Swal from 'sweetalert2';
import { ClientesInfoBasicaOportunidadInterface } from '../../../../core/interface/clienteInfoOportunidad.Interface';
import { ProductoInfoBasicaInterface } from '../../../../core/interface/producto-info-basica.interface';
import { ClientesService } from '../../../../services/clientes/clientes.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductosService } from '../../../../services/productos/productos.service';

@Component({
  selector: 'app-crear-oportunidades',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './crear-oportunidades.component.html',
  styleUrl: './crear-oportunidades.component.css',
})
export class CrearOportunidadesComponent implements OnInit {
  clientes: ClientesInfoBasicaOportunidadInterface[] = [];
  productos: ProductoInfoBasicaInterface[] = [];
  oportunidadComercialForm: FormGroup;
  usuarioSubscription: Subscription;

  get ROUTER_APP() {
    return ROUTER_APP;
  }

  constructor(
    private fb: FormBuilder,
    private oportunidadesService: OportunidadesService,
    private clienteService: ClientesService,
    private productoService: ProductosService,
  ) {}

  ngOnInit(): void {
    this.oportunidadComercialForm = this.fb.group({
      oportunidad: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required),
      producto:new FormControl('', Validators.required),
      gestion:new FormControl('', Validators.required),
    });


  this.getClientes();
  this.cargarProductos();


  }

  crearOportinidad() {
    const oportunidadNueva = this.oportunidadComercialForm.value;
    if (this.oportunidadComercialForm.valid) {
      const data: OportunidadInterface = {
        oportunidad: oportunidadNueva.oportunidad || '',
        cliente: oportunidadNueva.cliente || '',
        producto: oportunidadNueva.producto || '',
        gestion: oportunidadNueva.gestion || '',
      };
      console.log('Esta es la info de la oportunidad', data)
      this.oportunidadesService.crearoportunidad(data).subscribe({
        next: (resp: any) => {
          Swal.fire({
            title: 'Oportunidad creada  ',
            text: `La oportunidad comercial  ha sido creada con éxito.`,
            icon: 'success',
          });
        },
        error: (error: any) => {
          Swal.fire({
            title: 'No se pudo crear el Producto ',
            icon: 'error',
          });
        },
      });
      this.resetForm();
    }
  }

  getClientes(){
    this.clienteService.getClientes().subscribe((resp: any)=>{
      this.clientes = resp.clientes;
    })
  }



  cargarProductos() {
    this.usuarioSubscription = this.productoService.getProductos()
      .subscribe((resp: any) => {
        this.productos = resp.productos;
                
      });
  }


  resetForm() {
    this.oportunidadComercialForm.reset(); 
  }
}
