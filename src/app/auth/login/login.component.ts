import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuntenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AuntenticacionService,
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
          const { nombre, login, email } = resp.usuario;

          Swal.fire({
            html: `Bienvenido ${nombre}`,
          }).then(() => {
            this.router.navigateByUrl('dashBoard');
          });
        }
      },
      error: (error: any) => {
        console.error(error.error.msg);
      },
    });
  }


}

