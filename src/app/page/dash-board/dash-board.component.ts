import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CrearUsuariosComponent } from '../usuarios/crear-usuarios/crear-usuarios.component';
import { ConsultarUsuariosComponent } from '../usuarios/consultar-usuarios/consultar-usuarios.component';
import { EliminarUsuariosComponent } from '../usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from '../usuarios/editar-usuarios/editar-usuarios.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ROUTER_APP } from '../../core/enum/router-app.enum';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';

@Component({
    selector: 'app-dash-board',
    standalone: true,
    templateUrl: './dash-board.component.html',
    styleUrl: './dash-board.component.css',
    imports: [
        RouterLink,
        CrearUsuariosComponent,
        ConsultarUsuariosComponent,
        EliminarUsuariosComponent,
        EditarUsuariosComponent,
        FooterComponent,
        HeaderComponent,
        PermisosDirective,
    ]
})
export class DashBoardComponent {
  autenticacionService = inject(AutenticacionService);

  get ROUTER_APP() {
    return ROUTER_APP;
  }

  cerrarSesion() {
    this.autenticacionService.logOut();
    }
}
