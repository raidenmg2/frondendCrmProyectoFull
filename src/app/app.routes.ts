import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DashBoardComponent } from './page/dash-board/dash-board.component';
import { CrearUsuariosComponent } from './page/usuarios/crear-usuarios/crear-usuarios.component';
import { ConsultarUsuariosComponent } from './page/usuarios/consultar-usuarios/consultar-usuarios.component';
import { EditarUsuariosComponent } from './page/usuarios/editar-usuarios/editar-usuarios.component';
import { EliminarUsuariosComponent } from './page/usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { CrearProductoComponent } from './page/productos/crear-producto/crear-producto.component';
import { ConsultarProductoComponent } from './page/productos/consultar-producto/consultar-producto.component';
import { EditarProductoComponent } from './page/productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './page/productos/eliminar-producto/eliminar-producto.component';
import { ConsultarVentaComponent } from './page/ventas/consultar-venta/consultar-venta.component';
import { InformeVentasComponent } from './page/ventas/informe-ventas/informe-ventas.component';
import { EditarVentaComponent } from './page/ventas/editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './page/ventas/eliminar-venta/eliminar-venta.component';
import { LoginComponent } from './auth/login/login.component';
import { CrearClienteComponent } from './page/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './page/clientes/editar-cliente/editar-cliente.component';
import { ConsultarClienteComponent } from './page/clientes/consultar-cliente/consultar-cliente.component';
import { EliminarClienteComponent } from './page/clientes/eliminar-cliente/eliminar-cliente.component';




export const routes: Routes = [

    {
        path:'',
        title: 'Inicio',
        component: HomeComponent,
    },
    {        
      path:'login',
      title: 'login',
      component:LoginComponent ,
      },
    {        
    path:'dashBoard',
    title: 'Main menu',
    component: DashBoardComponent,
    },
    {
        path: 'crear-usuario',
        title: 'crear usuario',
        component: CrearUsuariosComponent,
    },
    {
        path: 'consultar-usuarios',
        title: 'consultar usuario',
        component: ConsultarUsuariosComponent,
      },

      {
        path: 'editar-usuarios',
        title: 'editar usuario',
        component: EditarUsuariosComponent,
      },
      {
        path: 'eliminar-usuarios',
        title: 'eliminar usuarios',
        component: EliminarUsuariosComponent,
      },
      {
        path: 'crearProducto',
        title: 'crear productos',
        component: CrearProductoComponent,
      }, {
        path: 'consultarProducto',
        title: 'consultar productos',
        component: ConsultarProductoComponent,
      },
      {
        path: 'editarProducto',
        title: 'Editar productos',
        component: EditarProductoComponent,
      },
      {
        path: 'eliminarProducto',
        title: 'Eliminar productos',
        component: EliminarProductoComponent,
      },
      {
        path: 'informeVentas',
        title: 'informe ventas totales',
        component: InformeVentasComponent,
      },
      {
        path: 'consultaVentas',
        title: 'consulta venta',
        component: ConsultarVentaComponent,
      },
      {
        path: 'editarVenta',
        title: 'Editar venta',
        component: EditarVentaComponent,
      },
      {
        path: 'eliminarVenta',
        title: 'Eliminar Venta',
        component: EliminarVentaComponent,
      },
      {
        path: 'crearCliente',
        title: 'Vincular cliente',
        component: CrearClienteComponent,
      },
      {
        path: 'editarCliente',
        title: 'Editar cliente',
        component: EditarClienteComponent,
      },
      {
        path: 'consultarCliente',
        title: 'Consultar cliente',
        component: ConsultarClienteComponent,
      },
      {
        path: 'eliminarCliente',
        title: 'Elminar cliente',
        component: EliminarClienteComponent,
      },
     
      
      
    
];


