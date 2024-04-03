import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../core/interface/models/clientes.models';
import { ClientesInfoBasica } from '../../core/interface/cliente-info-basica.interface';
import { ClientesInfoContacto } from '../../core/interface/clientes-info-contacto';
import { ClientesInfoFinanciera } from '../../core/interface/cliente-info-financiera';
import { ClientesFormularioInterface } from '../../core/interface/clienteFormulario.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // inyectar un servicio como parametro
  constructor(private httpClient: HttpClient) { }

  getClientes(){
    return this.httpClient.get(`${base_url}/cliente`)

  }

  crearClientes(cliente: ClientesFormularioInterface){
    return this.httpClient.post(`${base_url}/cliente`, cliente);
    
  }

  // crearInfoBasica(cliente: ClientesInfoBasica){
  //   return this.httpClient.post(`${base_url}/cliente`, cliente);
    
  // }
  // crearInfoContacto(cliente: ClientesInfoContacto){
  //   return this.httpClient.post(`${base_url}/cliente`, cliente);
    
  // }
  // crearInfoFinanciera(cliente: ClientesInfoFinanciera){
  //   return this.httpClient.post(`${base_url}/cliente`, cliente);
    
  // }


  
}