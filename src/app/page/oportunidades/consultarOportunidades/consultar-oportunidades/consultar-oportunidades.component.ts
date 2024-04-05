import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrearOportunidadesComponent } from '../../crearOportunidades/crear-oportunidades/crear-oportunidades.component';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../../core/interface/models/usuario.models';
import { ROUTER_APP } from '../../../../core/enum/router-app.enum';
import { AutenticacionService } from '../../../../services/autenticacion/autenticacion.service';
import { OportunidadesService } from '../../../../services/oportunidades/oportunidades.service';
import Swal from 'sweetalert2';
import { OportunidadInterface } from '../../../../core/interface/oportunidad.interface';
import { ClientesInfoBasicaOportunidadInterface } from '../../../../core/interface/clienteInfoOportunidad.Interface';
import { ProductoInfoBasicaInterface, ProductoInfoBasicaOportunidadInterface } from '../../../../core/interface/producto-info-basica.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-oportunidades',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    FormsModule,
    CrearOportunidadesComponent, CommonModule
    
  ],
  templateUrl: './consultar-oportunidades.component.html',
  styleUrl: './consultar-oportunidades.component.css',
})
export class ConsultarOportunidadesComponent implements OnInit {
  oportunidades: OportunidadInterface[] = [];
  cliente: ClientesInfoBasicaOportunidadInterface[]=[];
  producto: ProductoInfoBasicaInterface[]=[];
  usuarioSubscription: Subscription;
  usuarioLogin: UsuarioModel;

  get ROUTER_APP() {
    return ROUTER_APP;
  }

  constructor(
    private OportunidadService: OportunidadesService,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarOportunidades();
  }

  AgregarOportunidad() {
    this.router.navigateByUrl(`${ROUTER_APP.CREAR_USUARIOS}/nuevo`);
  }

  editarOportunidad(id: String) {
    console.log('informacion ID en metodo', id);
    this.router.navigateByUrl(`${ROUTER_APP.EDITAR_OPORTUNIDADES}/${id}`);
  }

  historialOportunidades(id: String) {
    console.log('informacion ID en metodo', id);
    this.router.navigateByUrl(`${ROUTER_APP.HISTORIAL_OPORTUNIDADES}/${id}`);
  }



  cargarOportunidades() {
    this.usuarioSubscription =
      this.OportunidadService.getOportunidades().subscribe((resp: any) => {
        this.oportunidades = resp.oportunidad;
        console.log('listado Oportunidades', this.oportunidades);
      });
  }

  eliminarOportunidad(id: string) {
    if (id === this.usuarioLogin._id) {
      Swal.fire('error', 'No se puede eliminarr esta oportunidad', 'error');
    } else {
      this.OportunidadService.eliminarUnaOportunidad(id).subscribe(
        (resp: any) => {
          Swal.fire(
            'eliminado',
            `se elimino el producto ${resp.usuario.nombres}`,
            'success'
          );
        }
      );
    }
  }
}