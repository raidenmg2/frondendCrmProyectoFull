import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../core/interface/clientes';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Subscriber } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { DashBoardComponent } from '../../dash-board/dash-board.component';


@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  imports: [CrearClienteComponent,DashBoardComponent, RouterLink],
  templateUrl: './consultar-cliente.component.html',
  styleUrl: './consultar-cliente.component.css',
})
export class ConsultarClienteComponent implements OnInit {
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

  eliminarCliente(idCliente: number): void {
    this.misClientes = this.misClientes.filter(
      (cliente) => cliente._id !== idCliente
    );
    // this.misClientes.slice(idCliente, 1);
    // console.log('Eliminar',this.misClientes)
  }

  recibirData(nuevoCliente: Clientes) {
    this.misClientes.push(nuevoCliente);
  }

  showAgregarClientes() {
    this.mostrar = true;
  }

  AgregarCliente() {
    this.router.navigateByUrl('crearCliente');
  }
  formularioCliente() {
    this.router.navigateByUrl('formularioPrincipalCliente');
  }
}
