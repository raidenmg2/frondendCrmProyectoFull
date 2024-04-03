import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { ProductoModel } from '../../../core/interface/models/producto.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';

import { ProductosService } from '../../../services/productos/productos.service';
import { caracteristicasTecnicas } from '../../../core/interface/producto-caracteristicas-tecnicas.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-consultar-producto',
    standalone: true,
    templateUrl: './consultar-producto.component.html',
    styleUrl: './consultar-producto.component.css',
    imports: [HeaderComponent,RouterLink,NgFor, CommonModule]
})
export class ConsultarProductoComponent {
    productos: ProductoModel[] = [];
    caracteristicasFisicas: ProductoModel[] = [];
    caracteristicasTectnicas: caracteristicasTecnicas[] = [];

    usuarioSubscription: Subscription;
    usuarioLogin: UsuarioModel;

    get ROUTER_APP() {
        return ROUTER_APP;
      }
    
      constructor(
        private productoService: ProductosService,
        private autenticacionService: AutenticacionService,
        private router: Router
      ) {}
    
      ngOnInit(): void {
        this.usuarioLogin = this.autenticacionService.usuario;
        this.cargarProductos();
      }
    
      ngOnDestroy(): void {
         this.usuarioSubscription?.unsubscribe();
      }
    
      AgregarProducto() {
        this.router.navigateByUrl(`${ROUTER_APP.CREAR_USUARIOS}/nuevo`);
      }
    
      editarProducto(id:String){
        console.log('informacion ID en metodo',id)
        this.router.navigateByUrl(`${ROUTER_APP.EDITAR_USUARIOS}/${id}`);
      }
  
      actualizarProducto(id:String){
    
        this.router.navigateByUrl(`${ROUTER_APP.EDITAR_USUARIOS}/${id}`);
      }
      
      cargarProductos() {
        this.usuarioSubscription = this.productoService.getProductos()
          .subscribe((resp: any) => {
            this.productos = resp.productos;
            console.log('listado productos', this.productos)
            console.log('caracteristicas tecnicas', this.caracteristicasTectnicas)
            
          });
      }
    
      eliminarProducto(id: string) {
        if (id === this.usuarioLogin._id) {
          Swal.fire('error', 'No se puede elimir este usuario', 'error');
        } else {
          this.productoService.eliminarUnProducto(id).subscribe((resp: any) => {
            Swal.fire(
              'eliminado',
              `se elimino el producto ${resp.usuario.nombres}`,
              'success'
            );
          });
        }
      }
  

}
