import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StepperComponent } from '../../../stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { InformacionBasicaComponent } from '../informacion-basica/informacion-basica.component';
import { InformacionContactoComponent } from '../informacion-contacto/informacion-contacto.component';
import { InformacionFinancieraComponent } from '../informacion-financiera/informacion-financiera.component';
import { FinFormularioComponent } from '../fin-formulario/fin-formulario.component';
import { ClientesInfoBasica } from '../../../core/interface/cliente-info-basica.interface';
import { ClientesInfoContacto } from '../../../core/interface/clientes-info-contacto';
import { ClientesInfoFinanciera } from '../../../core/interface/cliente-info-financiera';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { ClientesService } from '../../../services/clientes/clientes.service';
import Swal from 'sweetalert2';
import { ClienteModel } from '../../../core/interface/models/clientes.models';

@Component({
    selector: 'app-editar-cliente',
    standalone: true,
    templateUrl: './editar-cliente.component.html',
    styleUrl: './editar-cliente.component.css',
    imports: [HeaderComponent,RouterLink,
        StepperComponent,
        CdkStepperModule,
        InformacionBasicaComponent,
        InformacionContactoComponent,
        InformacionFinancieraComponent,
        FinFormularioComponent
        ]
})
export class EditarClienteComponent {
    @ViewChild(InformacionBasicaComponent)
    informacionBasicaComponent: InformacionBasicaComponent;
    @ViewChild(InformacionContactoComponent)
    informacionContactoComponent: InformacionContactoComponent;
    @ViewChild(InformacionFinancieraComponent)
    informacionLoginComponent: InformacionFinancieraComponent;

    valoresFormBasico: ClientesInfoBasica;
    valoresFormContacto: ClientesInfoContacto;
    valoresFormFinanciera: ClientesInfoFinanciera;
    clienteSelecionado: any;

    get ROUTER_APP() {
        return ROUTER_APP;
      }

      constructor(private clienteService: ClientesService,private activatedRoute: ActivatedRoute) {}
    
      ngOnInit(): void {
        this.activatedRoute.params.subscribe(({ id }) => {
          this.buscarcliente(id);
        });
      }

      buscarcliente(id: string) {
        if (id !== 'nuevo') {
          this.clienteService.getUnCliente(id).subscribe({
            next: (resp: any) => {
              const {
                nombres,
                apellidos,
                fechaNacimiento,
                ciudadNacimiento,
                tipoDocumento,
                numeroDocumento,
                paisExpedicion,
                ciudadExpedicion,
                fechaExpedicion,
                estadoCivil,
              } = resp.clientes;
              this.clienteSelecionado = resp.clientes;
    
              console.log(
                'Valor id usuario seleccionado metodo buscar',
                this.clienteSelecionado._id
              );
    
             
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

      actualizarCliente() {
      
        const dataActualizada: ClienteModel = {
            _id: this.clienteSelecionado._id,
            nombres: this.valoresFormBasico.nombres || '',
            apellidos: this.valoresFormBasico.apellidos || '',
            fechaNacimiento: this.valoresFormBasico.fechaNacimiento || '',
            ciudadNacimiento: this.valoresFormBasico.ciudadNacimiento || '',
            tipoDocumento: this.valoresFormBasico.tipoDocumento || '',
            numeroDocumento: this.valoresFormBasico.numeroDocumento || '',
            paisExpedicion: this.valoresFormBasico.paisExpedicion || '',
            ciudadExpedicion: this.valoresFormBasico.ciudadExpedicion || '',
            fechaExpedicion: this.valoresFormBasico.fechaExpedicion || '',
            estadoCivil: this.valoresFormBasico.estadoCivil || '',
            direccion: this.valoresFormContacto.direccion || '',
            ciudadResidencia: this.valoresFormContacto.ciudadResidencia || '',
            departamentoResidencia: this.valoresFormContacto.departamentoResidencia || '',
            telefono: Number(this.valoresFormContacto.telefono),
            email: this.valoresFormContacto.email || '',
            actividadEconomica: this.valoresFormFinanciera.actividadEconomica || '',
            
        };
        console.log('Datos editados', dataActualizada)
        this.clienteService.actualizarUnCliente(dataActualizada).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'Cliente Actualizado',
              `El clliente se actualizó satisfactoriamente`,
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
              title: 'Error al actualizar el usuario',
              icon: 'error',
              html: `${errorList.length ? errorList.join('') : error.error.msg}`,
            });
          },
        });
      }
    
      recibirInfoBasicaCliente(valores: ClientesInfoBasica) {
        console.log('estos son los valores', valores);
        console.log('este es el valor del id', valores._id);
        console.log('este es el valor del nombre', valores.nombres);
        this.valoresFormBasico = valores;
      }
      recibirInfoContactoCliente(valores: ClientesInfoContacto) {
        console.log('estos son los valores', valores);
        this.valoresFormContacto = valores;
      }
    
      recibirInfoFinancieraCliente(valores: ClientesInfoFinanciera) {
        console.log('estos son los valores', valores);
        this.valoresFormFinanciera = valores;
      }


}
