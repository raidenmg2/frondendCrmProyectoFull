import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClientesFormularioInterface } from '../../core/interface/clienteFormulario.interface';
import { ClienteModel } from '../../core/interface/models/clientes.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  // inyectar un servicio como parametro
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

  getClientes() {
    return this.httpClient.get(`${base_url}/cliente`, this.headers);
  }

  crearClientes(cliente: ClientesFormularioInterface) {
    return this.httpClient.post(`${base_url}/cliente`, cliente, this.headers);
  }
  eliminarUnCliente(id: string) {
    return this.httpClient.delete(`${base_url}/cliente/${id}`, this.headers);
  }

  getUnCliente(id:string) {
    return this.httpClient.get(`${base_url}/cliente/${id}`, this.headers);
  }

  actualizarUnCliente(cliente: ClienteModel) {
    return this.httpClient.put(
      `${base_url}/cliente/${cliente._id}`,
      cliente,
      this.headers
    );
  }

  obtenerHistorial(id: string) {
    return this.httpClient.get(`${base_url}/cliente/historial/${id}` , this.headers);
  }
}