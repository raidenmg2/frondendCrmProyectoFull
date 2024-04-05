import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { Subscription } from 'rxjs';
import { ClientesInfoBasicaOportunidadInterface } from '../../../core/interface/clienteInfoOportunidad.Interface';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { OportunidadInterface } from '../../../core/interface/oportunidad.interface';
import { ProductoInfoBasicaInterface } from '../../../core/interface/producto-info-basica.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { OportunidadesService } from '../../../services/oportunidades/oportunidades.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';

@Component({
  selector: 'app-historial-oportunidades',
  standalone: true,
  imports: [HeaderComponent, RouterLink,CommonModule],
  templateUrl: './historial-oportunidades.component.html',
  styleUrl: './historial-oportunidades.component.css'
})
export class HistorialOportunidadesComponent implements OnInit {
  get ROUTER_APP() {
    return ROUTER_APP;
  }

  historialOportunidades: OportunidadInterface[] = [];
 





  constructor(
    private oportunidadesService: OportunidadesService,
    private autenticacionService: AutenticacionService,
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.clienteService.obtenerHistorial(id).subscribe((resp: any) => {
        this.historialOportunidades = resp.oportunidades;
        console.log('listado Oportunidades', this.historialOportunidades);
      });
    });
   
  
  }


}
