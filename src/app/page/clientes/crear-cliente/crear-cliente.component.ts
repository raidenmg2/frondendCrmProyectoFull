import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { StepperComponent } from '../../../stepper/stepper.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { InformacionBasicaComponent } from '../informacion-basica/informacion-basica.component';
import { InformacionContactoComponent } from '../informacion-contacto/informacion-contacto.component';
import { InformacionFinancieraComponent } from '../informacion-financiera/informacion-financiera.component';
import { FinFormularioComponent } from '../fin-formulario/fin-formulario.component';
import { ClientesInfoBasica } from '../../../core/interface/cliente-info-basica.interface';
import { ClientesFormularioInterface } from '../../../core/interface/clienteFormulario.interface';
import { ClientesInfoContacto } from '../../../core/interface/clientes-info-contacto';
import { ClientesInfoFinanciera } from '../../../core/interface/cliente-info-financiera';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { HeaderComponent } from "../../../shared/header/header.component";

@Component({
    selector: 'app-crear-cliente',
    standalone: true,
    templateUrl: './crear-cliente.component.html',
    styleUrl: './crear-cliente.component.css',
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
    imports: [
        RouterLink,
        StepperComponent,
        CdkStepperModule,
        InformacionBasicaComponent,
        InformacionContactoComponent,
        InformacionFinancieraComponent,
        FinFormularioComponent,
        HeaderComponent
    ]
})
export class CrearClienteComponent implements OnInit {
  @ViewChild(InformacionBasicaComponent)
  informacionBasicaComponent: InformacionBasicaComponent;
  @ViewChild(InformacionContactoComponent)
  informacionContactoComponent: InformacionContactoComponent;
  @ViewChild(InformacionFinancieraComponent)
  informacionFinancieraComponent: InformacionFinancieraComponent;
  valoresFormBasico: ClientesInfoBasica;
  valoresFormContacto: ClientesInfoContacto;
  valoresFormFinanciera: ClientesInfoFinanciera;

  constructor(private ClienteServise: ClientesService) {}
  ngOnInit(): void {}

  crearCliente() {
    // const clienteNuevo = this.clienteForm.value;

    const data: ClientesFormularioInterface = {
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
      departamentoResidencia:
        this.valoresFormContacto.departamentoResidencia || '',
      telefono: Number(this.valoresFormContacto.telefono),
      email: this.valoresFormContacto.email || '',
      actividadEconomica: this.valoresFormFinanciera.actividadEconomica || '',
    };

    console.log('Estos son los Datos completos', data);

    this.ClienteServise.crearClientes(data).subscribe({
      next: (resp: any) => {
        console.log('Cliente creado', resp);

        Swal.fire({
          title: 'cliente creado  ' + resp.cliente.nombres,
          icon: 'success',
        });
        this.informacionBasicaComponent.resetearFormulario();
        this.informacionContactoComponent.resetearFormulario();
        this.informacionFinancieraComponent.resetearFormulario();
      },

      error: (error: any) => {
        Swal.fire({
          title: 'No se pudo crear el Cliente ',
          icon: 'error',
        });
      },
    });
  }

  recibirInfoBasica(valores: ClientesInfoBasica) {
    console.log('estos son los valores', valores);
    this.valoresFormBasico = valores;
  }
  recibirInfoContacto(valores: ClientesInfoContacto) {
    console.log('estos son los valores', valores);
    this.valoresFormContacto = valores;
  }
  recibirInfoFinanciera(valores: ClientesInfoFinanciera) {
    console.log('estos son los valores', valores);
    this.valoresFormFinanciera = valores;
  }
  get ROUTER_APP() {
    return ROUTER_APP;
  }
}
