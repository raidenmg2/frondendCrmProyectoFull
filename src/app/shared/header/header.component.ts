import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  // mostrarModal(): void{

  //   type LoginFormResult = {
  //     username: string
  //     password: string
  //   }
    
  //   let usernameInput: HTMLInputElement
  //   let passwordInput: HTMLInputElement
    
  //   Swal.fire<LoginFormResult>({
  //     title: 'Inicio de sesión',
  //     html: `

  //     <style>
  //     #swal2-html-container{
  //       overflow: visible;         
  //     }
  //     #swal2-title{
  //       padding-top: 15px;         
  //     }
  //     .button{
  //       text-decoration: none;
  //       text-align: center;
  //       padding:10px 20px;
  //       background-color: #007bff;
  //       color: #fff;
  //       border: none;
  //       cursor: pointer;
  //       border-radius: 20px;    
               
  //     }
  //     #username{
  //       margin-top:20.5px;
  //     }
  //     </style>
  //     <div>    
  //     <input type="text" id="username" class="swal2-input" placeholder="usuario">
  //     <input type="password" id="password" class="swal2-input" placeholder="contraseña">
  //     <br>
  //     <br>
  //     <a  class="button" href="dashBoard">Ingresar</a>
  //     </div>
  //     `,

      
  //     confirmButtonText: 'Ingresar',
  //     showConfirmButton:false,
     
  //     focusConfirm: false,
  //     didOpen: () => {
  //       const popup = Swal.getPopup()!
  //       usernameInput = popup.querySelector('#username') as HTMLInputElement
  //       passwordInput = popup.querySelector('#password') as HTMLInputElement
  //       usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
  //       passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
  //     },
  //     preConfirm: () => {
  //       const username = usernameInput.value
  //       const password = passwordInput.value
  //       if (!username || !password) {
  //         Swal.showValidationMessage(`Please enter username and password`)
  //       }
  //       return { username, password }
  //     },
  //   })
  
  
  
  
  // }

}