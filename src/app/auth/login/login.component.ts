import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../core/enum/router-app.enum';
// import { ROUTER_APP } from '../../core/enum/router-app.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm!: FormGroup;
  get ROUTER_APP() {
    return ROUTER_APP;
  }

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get login() {
    return this.loginForm?.get('login');
  }
  get password() {
    return this.loginForm?.get('password');
  }

  realizoLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    this.autenticacionService.login(data).subscribe({
      next: (resp: any) => {
        if (resp && resp.usuario) {
          const { nombre: nombres, login, email, apellidos } = resp.usuario;

          Swal.fire({
            html: `Bienvenido ${apellidos}`,
          }).then(() => {
            this.router.navigateByUrl(ROUTER_APP.DASHBOARD);
          });
        }
      },
      error: (error: any) => {
        console.error(error.error.msg);
      },
    });
  }


}

