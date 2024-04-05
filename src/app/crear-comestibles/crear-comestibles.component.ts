import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AppConfig } from '../../globals';
import { IMedida } from '../interface/medida';
import { MedidaService } from '../service/medida.service';
import { Router } from '@angular/router';
import { IConsecutivos } from '../interface/consecutivos';
import { ConsecutivosService } from '../service/consecutivos.service';
import { IComestible } from '../interface/comestible';
import { ComestibleService } from '../service/proveedores/comestible.service';

@Component({
  selector: 'app-crear-comestibles',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-comestibles.component.html',
  styleUrl: './crear-comestibles.component.css'
})
export class CrearComestiblesComponent {

  medidas: IMedida[] = [];
  consecutivos: IConsecutivos[] = [];
  comestibles: IComestible[] = [];

  formularioCrear:FormGroup;

  comestible = {
    codigo: "",
    nombre: "",
    cantidad: 0,
    tipo: "Frutas",
    restaurante: AppConfig.restActual,
    marca: "",
    clase: "Fibra",
    linea: "Secos",
    unidad: ""
  }

  constructor(private medidasService:MedidaService, private consecutivosService:ConsecutivosService, private comestibleService:ComestibleService, private router:Router){
    this.obtenerMedidas();
    this.obtenerConsecutivos();
    this.formularioCrear = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.max(50), Validators.min(1)]),
      tipo: new FormControl('Frutas'),
      restaurante: new FormControl(AppConfig.restActual),
      marca: new FormControl('', [Validators.required]),
      clase: new FormControl('Fibra'),
      linea: new FormControl('Secos'),
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
      this.comestibleService.addComestible(this.formularioCrear.value)
      .subscribe(
        (data) => {
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('La solicitud fue exitosa:', data);
          alert("Se creo el comestible exitosamente")
          location.reload()
        },
        (error) => {
          // Ocurrió un error durante la solicitud, puedes manejarlo aquí
          console.error('Ocurrió un error:', error);
          alert("Error: "+error)
        }
      );
    }
  }

  cancelar(){
    location.reload();
  }

}
