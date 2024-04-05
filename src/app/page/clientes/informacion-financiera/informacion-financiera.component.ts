import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ClientesInfoFinanciera } from '../../../core/interface/cliente-info-financiera';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [CdkStepper, CdkStepperModule, CdkStepper, CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-financiera.component.html',
  styleUrl: './informacion-financiera.component.css',
})
export class InformacionFinancieraComponent implements OnInit{
  enviarFormulario: any;
  informacionFinancieraForm: FormGroup;
  @Output() valoresFormulario: EventEmitter<ClientesInfoFinanciera> =
  new EventEmitter<ClientesInfoFinanciera>();
  clienteSelecionado: any;



  
  constructor( private fb: FormBuilder,private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.informacionFinancieraForm = this.fb.group({
      actividadEconomica: new FormControl('', [Validators.required]),
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarCliente(id);
      
    });
   
  }
  
  

  crearInformacionFinanciera() {
    const clienteNuevoInfoFinanciera = this.informacionFinancieraForm.value;
    if (this.informacionFinancieraForm.valid) {
      const data: ClientesInfoFinanciera = {
        actividadEconomica: clienteNuevoInfoFinanciera.actividadEconomica || '',
      };
      
      this.enviarFormulario.emit(this.informacionFinancieraForm.value);
      console.log('datos', this.informacionFinancieraForm.value);
    }
  }

  submitInformacionFinanciera() {
    console.log('información', this.informacionFinancieraForm);
    this.valoresFormulario.emit(this.informacionFinancieraForm.value);
  }

  resetearFormulario() {
    this.informacionFinancieraForm.reset();
  }

  buscarCliente(id: string) {
    if (id !== 'nuevo') {
      this.clienteService.getUnCliente(id).subscribe({
        next: (resp: any) => {
          const {
            actividadEconomica,      
            
          } = resp.clientes;
          this.clienteSelecionado = resp.clientes;
  
          this.informacionFinancieraForm.setValue({
            actividadEconomica:actividadEconomica,
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
}
