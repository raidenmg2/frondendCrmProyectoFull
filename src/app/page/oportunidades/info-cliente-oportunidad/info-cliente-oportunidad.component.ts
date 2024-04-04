import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OportunidadModel } from '../../../core/interface/models/oportunidad.models';
import { ActivatedRoute } from '@angular/router';
import { ClientesInfoBasicaOportunidadInterface } from '../../../core/interface/clienteInfoOportunidad.Interface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { ClientesService } from '../../../services/clientes/clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-info-cliente-oportunidad',
  standalone: true,
  imports: [CdkStepper,
    CdkStepperModule,
    CdkStepper,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './info-cliente-oportunidad.component.html',
  styleUrl: './info-cliente-oportunidad.component.css'
})
export class InfoClienteOportunidadComponent implements OnInit {
  enviarFormulario: any;
  usuarioSelecionado: OportunidadModel;
  clientes: ClientesInfoBasicaOportunidadInterface[] = [];
  

  informacionClienteOportunidadForm: FormGroup;

  @Output() valoresFormulario: EventEmitter<ClientesInfoBasicaOportunidadInterface> =
  new EventEmitter<ClientesInfoBasicaOportunidadInterface>();
  

  constructor(private fb: FormBuilder, private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute,private clienteService: ClientesService,
    
    ) {}

  ngOnInit(): void {
    this.informacionClienteOportunidadForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
    });
    
    this.clienteService.getClientes().subscribe((resp: any)=>{
      this.clientes = resp.clientes;
    })

  this.getClientes();
  }

  crearInfoClienteOportunidad() {
    const nuevaOportunidad = this.informacionClienteOportunidadForm.value;
    if (this.informacionClienteOportunidadForm.valid) {
      const data: ClientesInfoBasicaOportunidadInterface = {
        nombres: nuevaOportunidad.nombres || '',
        apellidos: nuevaOportunidad.apellidos || '',
        numeroDocumento: nuevaOportunidad. numeroDocumento|| '',
        telefono: nuevaOportunidad.telefono || '',
        email: nuevaOportunidad.email || '',
      };

      this.enviarFormulario.emit(this.informacionClienteOportunidadForm?.value);
      console.log('datos', this.informacionClienteOportunidadForm.value);
    }
  }

  submitInformacionClienteOportunidad() {
    console.log('información', this.informacionClienteOportunidadForm);
    this.valoresFormulario.emit(this.informacionClienteOportunidadForm.value);
  }

  resetearFormulario() {
    this.informacionClienteOportunidadForm.reset();
  }

  getClientes(){
    this.clienteService.getClientes().subscribe((resp: any)=>{
      this.clientes = resp.clientes;
    })
  }

  buscarCliente(documento: string) {
    const clienteEncontrado = this.clientes.find(cliente => cliente.numeroDocumento === documento);
    if (clienteEncontrado) {
      this.informacionClienteOportunidadForm.setValue({
        numeroDocumento: clienteEncontrado.numeroDocumento,
        nombres: clienteEncontrado.nombres,
        apellidos: clienteEncontrado.apellidos,
        telefono: clienteEncontrado.telefono,
        email: clienteEncontrado.email
      });
    }
    else{   
     
        Swal.fire({
          title: 'numero de documento no existe en la base de datos ',
          icon: 'error',
        });
   


    }
  }
}

 


