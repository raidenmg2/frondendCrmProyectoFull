import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { Router, RouterLink } from '@angular/router';
import { CrearUsuariosComponent } from '../crear-usuarios/crear-usuarios.component';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { config } from '../../../../environments/configuration/config';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InfoBasicaUsuariosComponent } from '../info-basica-usuarios/info-basica-usuarios.component';
import { InfoContactoUsuariosComponent } from '../info-contacto-usuarios/info-contacto-usuarios.component';
import { InfoLoginUsuariosComponent } from '../info-login-usuarios/info-login-usuarios.component';

@Component({
  selector: 'app-consultar-usuarios',
  standalone: true,
  templateUrl: './consultar-usuarios.component.html',
  styleUrl: './consultar-usuarios.component.css',
  imports: [HeaderComponent, RouterLink, CrearUsuariosComponent, FormsModule,InfoBasicaUsuariosComponent,InfoContactoUsuariosComponent,InfoLoginUsuariosComponent, ConsultarUsuariosComponent],
})
export class ConsultarUsuariosComponent implements OnInit, OnDestroy {
    usuarios: UsuarioModel[] = [];
    usuarioSubscription: Subscription;
    usuarioLogin: UsuarioModel;
    roles = config.roles;
  
    // roles= Object.values(config.roles);
    get ROUTER_APP() {
      return ROUTER_APP;
    }
  
    constructor(
      private usuarioService: UsuariosService,
      private autenticacionService: AutenticacionService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.usuarioLogin = this.autenticacionService.usuario;
      this.cargarUsuarios();
      console.log('este es el listado usuarios', this.usuarios)
    }
  
    ngOnDestroy(): void {
       this.usuarioSubscription?.unsubscribe();
    }
  
    // AgregarUsuario() {
    //   this.router.navigateByUrl(`${ROUTER_APP.CREAR_USUARIOS}/nuevo`);
    // }
  
    editarUsuarios(id:String){
      console.log('informacion ID en metodo',id)
      this.router.navigateByUrl(`${ROUTER_APP.EDITAR_USUARIOS}/${id}`);
    }


    
    cargarUsuarios() {
      this.usuarioSubscription = this.usuarioService
        .getUsuarios()
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
          
        });
    }
  
    eliminarUsuario(id: string) {
      if (id === this.usuarioLogin._id) {
        Swal.fire('error', 'No se puede eliminar este usuario', 'error');
      } else {
        this.usuarioService.eliminarUnUsuario(id).subscribe((resp: any) => {
          Swal.fire(
            'eliminado',
            `se elimino el usuario ${resp.usuario.nombres}`,
            'success'
          );
        });
      }
    }
  
    actualizarRol(usuario: UsuarioModel) {
      this.usuarioService.actualizarUnUsuario(usuario).subscribe((resp: any) => {
        Swal.fire(
          'Actializado',
          `se actualizo el usuario ${resp.usuario.nombres}`,
          'success'
        );
      });
    }
}
