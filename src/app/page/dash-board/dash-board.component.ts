import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearUsuariosComponent } from '../usuarios/crear-usuarios/crear-usuarios.component';
import { ConsultarUsuariosComponent } from '../usuarios/consultar-usuarios/consultar-usuarios.component';
import { EliminarUsuariosComponent } from '../usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from '../usuarios/editar-usuarios/editar-usuarios.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
    selector: 'app-dash-board',
    standalone: true,
    templateUrl: './dash-board.component.html',
    styleUrl: './dash-board.component.css',
    imports: [RouterOutlet, CrearUsuariosComponent, ConsultarUsuariosComponent, EliminarUsuariosComponent, EditarUsuariosComponent, FooterComponent]
})
export class DashBoardComponent {
year: any;

}
