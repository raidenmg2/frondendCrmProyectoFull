import { Component, OnInit } from '@angular/core';
import { ROUTER_APP } from '../../../../core/enum/router-app.enum';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { OportunidadInterface, gestionarOportunidadInterface } from '../../../../core/interface/oportunidad.interface';
import { OportunidadesService } from '../../../../services/oportunidades/oportunidades.service';
import Swal from 'sweetalert2';
import { header } from 'express-validator';
import { HeaderComponent } from '../../../../shared/header/header.component';

@Component({
  selector: 'app-editar-oportunidad',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HeaderComponent],
  templateUrl: './editar-oportunidad.component.html',
  styleUrl: './editar-oportunidad.component.css',
})
export class EditarOportunidadComponent implements OnInit {
  oportunidades: OportunidadInterface[] = [];
  gestionOportunidadForm: FormGroup;
  oportunidadSeleccionada: any;

  get ROUTER_APP() {
    return ROUTER_APP;
  }

  constructor(
    private fb: FormBuilder,
    private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private oportunidadesService: OportunidadesService
  ) {}

  ngOnInit(): void {
    this.gestionOportunidadForm = this.fb.group({
      oportunidad: new FormControl('', Validators.required),
      // _id: ['', Validators.required],
      gestion: ['', Validators.required],
      cliente: ['', Validators.required],
      producto: ['', Validators.required],
      usuario: ['', Validators.required],
      nuevaGestion: ['', Validators.required],
      notasInteraccion: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarOportunidad(id);
    });

  }

  // getOportunidades(){
  //   this.oportunidadesService.getOportunidades().subscribe((resp: any)=>{
  //     this.oportunidades = resp.oportunidades;
  //   })
  // }

  // buscarOportunidad(id: string) {
  //   const oportunidadEncontrada = this.oportunidades.find(oportunidad => oportunidad._id === id);
  //   if (oportunidadEncontrada) {
  //     this.gestionOportunidadForm.setValue({
  //       oportunidad: oportunidadEncontrada.oportunidad,
  //       cliente: oportunidadEncontrada.cliente.nombres,
  //       producto: oportunidadEncontrada.producto.nombre,
  //       gestion: oportunidadEncontrada.gestion,

  //     });
  //   }
  //   else{

  //       Swal.fire({
  //         title: 'oportunidad no existe en la base de datos ',
  //         icon: 'error',
  //       });

  //   }
  // }

  buscarOportunidad(id: string) {
    if (id !== 'nuevo') {
      this.oportunidadesService.getUnaportunidad(id).subscribe({
        next: (resp: any) => {
          const { 
            oportunidad,
            cliente,
            producto,
            gestion,
            usuario,
            nuevaGestion,
            notasInteraccion,
            } = resp.oportunidades;
          this.oportunidadSeleccionada = resp.oportunidades;

          console.log('Oportunidad', this.oportunidadSeleccionada)

          this.gestionOportunidadForm.setValue({
            
            oportunidad: oportunidad,
            cliente: cliente.nombres ,
            producto: producto.nombre ,
            gestion: gestion ,
            usuario: usuario ,
            nuevaGestion: nuevaGestion || '',
            notasInteraccion: notasInteraccion || '',

          });
        },

        //errores
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

  gestionarOportunidad() {
    const gestionOportunidad = this.gestionOportunidadForm.value;
    const dataActualizada: OportunidadInterface = {
      _id: this.oportunidadSeleccionada._id ||'',
      oportunidad: gestionOportunidad.oportunidad || '',
      cliente: this.oportunidadSeleccionada.cliente,
      producto: this.oportunidadSeleccionada.producto,
      gestion: gestionOportunidad.gestion || '',
      notasInteraccion: gestionOportunidad.notasInteraccion || ''
    };
    this.oportunidadesService.actualizarUnoportunidad(dataActualizada).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'gestion actualizada',
          `La gestion se actualizao satisfactoriamente`,
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push('* ' + value['msg'] + '<br>');
            }
          });
        }

        Swal.fire({
          title: 'Error al actualizar la gestión comercial',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }
}
