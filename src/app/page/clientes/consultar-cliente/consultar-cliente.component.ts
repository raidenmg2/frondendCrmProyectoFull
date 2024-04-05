import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../core/interface/clientes';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Subscriber } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { DashBoardComponent } from '../../dash-board/dash-board.component';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  templateUrl: './consultar-cliente.component.html',
  styleUrl: './consultar-cliente.component.css',
  imports: [
    CrearClienteComponent,
    DashBoardComponent,
    RouterLink,
    HeaderComponent,
  ],
})
export class ConsultarClienteComponent implements OnInit {
  get ROUTER_APP() {
    return ROUTER_APP;
  }
  misClientes: Clientes[] = [];
  mostrar: boolean = false;

  constructor(
    private clienteService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**vamos a hacer una subcripción de datos  */
    this.clienteService.getClientes().subscribe((data: any) => {
      console.log(data);
      this.misClientes = data.clientes;
    });
  }
  editarClientes(id: string) {
    this.router.navigateByUrl(`${ROUTER_APP.CREAR_CLIENTES}/${id}`);
  }

  actualizarClientes(id: string) {
    this.router.navigateByUrl(`${ROUTER_APP.CREAR_CLIENTES}/${id}`);
  }

  eliminarCliente(idCliente: string): void {
    this.clienteService.eliminarUnCliente(idCliente).subscribe((resp: any) => {
      Swal.fire(
        'eliminado',
        `se elimino el cliente ${resp.clientes.nombres}`,
        'success'
      );
    });
   
  }
  historialOportunidades(id: String) {
    console.log('informacion ID en metodo', id);
    this.router.navigateByUrl(`${ROUTER_APP.HISTORIAL_OPORTUNIDADES}/${id}`);
  }



  recibirData(nuevoCliente: Clientes) {
    this.misClientes.push(nuevoCliente);
  }

  showAgregarClientes() {
    this.mostrar = true;
  }

  AgregarCliente() {
    this.router.navigateByUrl(ROUTER_APP.CREAR_CLIENTES);
  }
  formularioCliente() {
    this.router.navigateByUrl('formularioPrincipalCliente');
  }
}
