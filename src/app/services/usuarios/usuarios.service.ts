import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioModel } from '../../core/interface/models/usuario.models';
import { usuariosInterface } from '../../core/interface/usuarios';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  } 

  getUsuarios() {
    return this.httpClient.get(`${base_url}/usuario`, this.headers);
  }
  crearUsuarios(usuario: usuariosInterface) {
    return this.httpClient.post(`${base_url}/usuario`, usuario, this.headers);
  }

  actualizarUnUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(
      `${base_url}/usuario/${usuario._id}`,
      usuario,
      this.headers
    );
  }

  eliminarUnUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuario/${id}`, this.headers);
  }
}
