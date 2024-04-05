import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { IDesechable } from '../interface/desechable';
import { AppConfig } from '../../globals';
import { DesechableService } from '../service/proveedores/desechable.service';
import { IConsecutivos } from '../interface/consecutivos';
import { ConsecutivosService } from '../service/consecutivos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-desechables',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-desechables.component.html',
  styleUrl: './crear-desechables.component.css'
})
export class CrearDesechablesComponent {

  desechables: IDesechable[] = []
  consecutivos: IConsecutivos[] = [];

  formularioCrear:FormGroup;

  comestible = {
    codigo: "",
    nombre: "",
    restaurante: AppConfig.restActual,
    marca: "",
    cantidad: 0,
    descripcion: ""
  }

  constructor(private desechableService:DesechableService, private consecutivosService:ConsecutivosService, private router:Router){
    this.obtenerConsecutivos();
    this.formularioCrear = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      restaurante: new FormControl(AppConfig.restActual),
      marca: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.max(50), Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required])
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
      this.desechableService.addDesechable(this.formularioCrear.value)
      .subscribe(
        (data) => {
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('La solicitud fue exitosa:', data);
          alert("Se creo el comestible exitosamente");
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
