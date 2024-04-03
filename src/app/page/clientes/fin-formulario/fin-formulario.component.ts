import { Component } from '@angular/core';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';

@Component({
  selector: 'app-fin-formulario',
  standalone: true,
  imports: [CrearClienteComponent],
  templateUrl: './fin-formulario.component.html',
  styleUrl: './fin-formulario.component.css'
})
export class FinFormularioComponent {
  

}
