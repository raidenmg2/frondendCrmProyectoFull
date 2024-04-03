import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../auth/login/login.component';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  
  nombreUsuario: any;
  autenticacionService = inject(AutenticacionService);
  
  ngOnInit(): void {
    
    this.nombreUsuario = this.autenticacionService.nombres;
    console.log('Este es el nombre de usuario',this.nombreUsuario);
    
  }
  

  cerrarSesion() {
    this.autenticacionService.logOut();
    }



}