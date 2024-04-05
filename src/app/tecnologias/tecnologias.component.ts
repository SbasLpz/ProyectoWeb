import { Component, OnInit } from '@angular/core';
import { IConsecutivos } from '../interface/consecutivos';
import { ConsecutivosService } from '../service/consecutivos.service';
import { AppConfig } from '../../globals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tecnologias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tecnologias.component.html',
  styleUrl: './tecnologias.component.css'
})
export class TecnologiasComponent implements OnInit {
  consecutivos: IConsecutivos[] = [];

  tecs = [{
    _id: 0,
    codigo:"",
    restaurante: "",
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    editMode: true
  }]

  tec = {
    _id: 0,
    codigo:"",
    restaurante: "",
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    editMode: true
  }

  constructor(private consecutivosService:ConsecutivosService){
    this.obtenerConsecutivos();
  }

  ngOnInit(): void {
    this.getUtensilios();
  }

  obtenerConsecutivos(){
    this.consecutivosService.getConsecutivos().subscribe((consecutivos:IConsecutivos[])=>{
      this.consecutivos = consecutivos;
    })
  }

  async getUtensilios(){
    const get = await fetch(AppConfig.apiUrl+"/tecs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.tecs = await get.json();
      console.log(this.tecs)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  toggleEditMode(lim: any) {
    lim.editMode = !lim.editMode;
  }

  async eliminar(tec: any){
    console.log("Eliminando elemento: "+tec.nombre)
    const confirmacion = window.confirm("¿Desea eliminar el tecnoilogico "+tec.nombre+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/tec/"+tec._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (remove.ok) {
      alert("Se elimino el elemento correctamente")
      this.getUtensilios();
    } else {
      const errorMessage = await remove.text();
      alert('Error al eliminar: '+errorMessage)
    }
  }

  async actualizar(tec:any){
    const desUpdate = await fetch(AppConfig.apiUrl+"/tec/"+tec._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tec)
    })

    if (desUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getUtensilios();
    } else {
      const errorMessage = await desUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Desechable actualizado: ", tec);
  }

}
