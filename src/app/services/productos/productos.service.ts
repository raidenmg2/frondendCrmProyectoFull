import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductoModel } from '../../core/interface/models/producto.models';
import { CrearProductoInterface, ProductoInterface } from '../../core/interface/producto.interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
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

  getProductos() {
    return this.httpClient.get(`${base_url}/producto`, this.headers);
  }

  getUnProducto(id: string) {
    return this.httpClient.get(`${base_url}/producto/${id}`, this.headers);
  }

  crearProducto(producto: CrearProductoInterface) {
    return this.httpClient.post(`${base_url}/producto`, producto, this.headers);
  }

  actualizarUnProducto(producto: ProductoModel) {
    return this.httpClient.put(
      `${base_url}/producto/${producto._id}`,
      producto,
      this.headers
    );
  }

  eliminarUnProducto(id: string) {
    return this.httpClient.delete(`${base_url}/producto/${id}`, this.headers);
  }
}
