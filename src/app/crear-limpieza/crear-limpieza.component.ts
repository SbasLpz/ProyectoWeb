import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IConsecutivos } from '../interface/consecutivos';
import { ILimpieza } from '../interface/limpieza';
import { AppConfig } from '../../globals';
import { LimpiezaService } from '../service/proveedores/limpieza.service';
import { ConsecutivosService } from '../service/consecutivos.service';
import { IMedida } from '../interface/medida';
import { MedidaService } from '../service/medida.service';

@Component({
  selector: 'app-crear-limpieza',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-limpieza.component.html',
  styleUrl: './crear-limpieza.component.css'
})
export class CrearLimpiezaComponent {

  consecutivos: IConsecutivos[] = [];
  limpiezas: ILimpieza[] = [];
  medidas: IMedida[] = [];

  formularioCrear:FormGroup;

  limpieza = {
    codigo: "",
    restaurante: AppConfig.restActual,
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    tipo: "",
    cantidadMedida: "",
    unidad: ""
  }

  constructor(private limpiezaService:LimpiezaService, private consecutivosService:ConsecutivosService, private medidasService:MedidaService){
    this.obtenerMedidas();
    this.obtenerConsecutivos();
    this.formularioCrear = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      restaurante: new FormControl(AppConfig.restActual),
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.max(50), Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      cantidadMedida: new FormControl('', [Validators.required]),
      unidad: new FormControl('', [Validators.required])
    })
  }

  obtenerMedidas(){
    this.medidasService.getMedidas().subscribe((medidas:IMedida[])=>{
      this.medidas = medidas;
    })
  }

  obtenerConsecutivos(){
    this.consecutivosService.getConsecutivos().subscribe((consecutivos:IConsecutivos[])=>{
      this.consecutivos = consecutivos;
    })
  }

  submit(e:Event):void{
    e.preventDefault();
    if (this.formularioCrear.valid) {
      this.limpiezaService.addLimpieza(this.formularioCrear.value)
      .subscribe(
        (data) => {
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('La solicitud fue exitosa:', data);
          alert("Se creo el utencilio exitosamente");
          location.reload();
        },
        (error) => {
          // Ocurrió un error durante la solicitud, puedes manejarlo aquí
          console.error('Ocurrió un error:', error);
          alert("Error: "+error);
        }
      );
    }
  }

  cancelar(){
    location.reload();
  }
}   
