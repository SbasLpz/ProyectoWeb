import { Component } from '@angular/core';
import { ITec } from '../interface/tec';
import { IConsecutivos } from '../interface/consecutivos';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppConfig } from '../../globals';
import { TecService } from '../service/proveedores/tec.service';
import { ConsecutivosService } from '../service/consecutivos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-tecnologia',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-tecnologia.component.html',
  styleUrl: './crear-tecnologia.component.css'
})
export class CrearTecnologiaComponent {
  consecutivos: IConsecutivos[] = [];
  tecs: ITec[] = [];

  formularioCrear:FormGroup;

  tec = {
    codigo: "",
    restaurante: AppConfig.restActual,
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: ""
  }

  constructor(private tecService:TecService, private consecutivosService:ConsecutivosService){
    this.obtenerConsecutivos();
    this.formularioCrear = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      restaurante: new FormControl(AppConfig.restActual),
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.max(50), Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required]),
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
      this.tecService.addTec(this.formularioCrear.value)
      .subscribe(
        (data) => {
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('La solicitud fue exitosa:', data);
          alert("Se creo la tecnología exitosamente");
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
