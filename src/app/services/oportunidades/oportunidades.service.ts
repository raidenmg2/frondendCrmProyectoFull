import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OportunidadModel } from '../../core/interface/models/oportunidad.models';
import { OportunidadInterface } from '../../core/interface/oportunidad.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class OportunidadesService {
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

  getOportunidades() {
    return this.httpClient.get(`${base_url}/oportunidad`, this.headers);
  }

  getUnaportunidad(id: string) {
    return this.httpClient.get(`${base_url}/oportunidad/${id}`, this.headers);
  }

  crearoportunidad(oportunidad: OportunidadInterface) {
    return this.httpClient.post(
      `${base_url}/oportunidad`,
      oportunidad,
      this.headers
    );
  }

  actualizarUnoportunidad(oportunidad: OportunidadModel) {
    return this.httpClient.put(
      `${base_url}/oportunidad/${oportunidad._id}`,
      oportunidad,
      this.headers
    );
  }

  eliminarUnaOportunidad(id: string) {
    return this.httpClient.delete(`${base_url}/producto/${id}`, this.headers);
  }
}
