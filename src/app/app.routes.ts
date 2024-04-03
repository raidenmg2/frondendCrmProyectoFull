import { Routes } from '@angular/router';
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
import { CrearVentaComponent } from './page/ventas/crear-venta/crear-venta.component';
import { authGuard } from './guards/auth/auth.guard';
import { ConsultarOportunidadesComponent } from './page/oportunidades/consultarOportunidades/consultar-oportunidades/consultar-oportunidades.component';
import { CrearOportunidadesComponent } from './page/oportunidades/crearOportunidades/crear-oportunidades/crear-oportunidades.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    children: [
      { path: '', component: HomeComponent },
      // aqui se puede gacer el cambio de contraseña como ruta hija
    ],
  },

  {
    path: 'dashboard',
    title: 'dashboard',
    canActivate: [authGuard],
    children: [
      { path: '', title: 'dashboard', component: DashBoardComponent }, // path por defecto del path padre
      {
        path: 'consultarCliente',
        title: 'consultar Cliente',
        children: [
          {
            path: '',
            title: 'Consultar Cliente',
            component: ConsultarClienteComponent,
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
            path: 'eliminarCliente',
            title: 'Elminar cliente',
            component: EliminarClienteComponent,
          },
        ],
      },
      {
        path: 'consultarUsuarios',
        title: 'consultar usuario',
        children: [
          {
            path: '',
            title: 'Consultar usuario',
            component: ConsultarUsuariosComponent,
          },
          {
            path: 'crearUsuario',
            title: 'crear usuario',
            component: CrearUsuariosComponent,
          },
          {
            path: 'editarUsuarios/:id',
            title: 'editar usuario',
            component: EditarUsuariosComponent,
          },
          {
            path: 'eliminarUsuarios',
            title: 'eliminar usuarios',
            component: EliminarUsuariosComponent,
          },
        ],
      },

      {
        path: 'consultarProducto',
        title: 'consultar productos',
        children: [
          {
            path: '',
            title: 'consultar productos',
            component: ConsultarProductoComponent,
          },
          {
            path: 'crearProducto',
            title: 'crear productos',
            component: CrearProductoComponent,
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
        ],
      },
      {
        path: 'consultaVentas',
        title: 'consulta venta',
        children: [
          {
            path: '',
            title: 'consulta ventas',
            component: ConsultarVentaComponent,
          },
          {
            path: 'informeVentas',
            title: 'informe ventas totales',
            component: InformeVentasComponent,
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
            path: 'crearVenta',
            title: 'Crear Venta',
            component: CrearVentaComponent,
          },
        ],
      },

      {
        path:'consultaOportunidades',
        title:'Consultar Oportunidades',
        children:[
          {
            path:'',
            title:'Consultar oportunidades',
            component: ConsultarOportunidadesComponent,
          },
          {
            path:'crearOportunidades',
            title:'crearOportunidades',
            component: CrearOportunidadesComponent,
          },



        ]


      }




    ],
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }, // si no encuentra la ruta direcciona al login
];
