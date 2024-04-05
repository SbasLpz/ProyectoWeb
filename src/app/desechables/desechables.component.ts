import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../globals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IConsecutivos } from '../interface/consecutivos';
import { ConsecutivosService } from '../service/consecutivos.service';

@Component({
  selector: 'app-desechables',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './desechables.component.html',
  styleUrl: './desechables.component.css'
})
export class DesechablesComponent implements OnInit {

  consecutivos: IConsecutivos[] = [];

  desechables = [{
    _id: 0,
    codigo:"",
    nombre:"",
    restaurante: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    editMode: true
  }]

  desechable = {
    _id: 0,
    codigo:"",
    nombre:"",
    restaurante: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    editMode: true
  }

  constructor(private consecutivosService:ConsecutivosService){
    this.obtenerConsecutivos();
  }

  ngOnInit(): void {
    this.getDesechables();
  }

  obtenerConsecutivos(){
    this.consecutivosService.getConsecutivos().subscribe((consecutivos:IConsecutivos[])=>{
      this.consecutivos = consecutivos;
    })
  }

  async getDesechables(){

    const get = await fetch(AppConfig.apiUrl+"/desechables", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.desechables = await get.json();
      console.log(this.desechables)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  toggleEditMode(des: any) {
    des.editMode = !des.editMode;
  }

  async eliminar(des: any){
    console.log("Eliminando elemento: "+des.nombre)
    const confirmacion = window.confirm("¿Desea eliminar el comestible "+des.nombre+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/desechable/"+des._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (remove.ok) {
      alert("Se elimino el elemento correctamente")
      this.getDesechables();
    } else {
      const errorMessage = await remove.text();
      alert('Error al eliminar: '+errorMessage)
    }
  }

  async actualizar(des:any){
    const desUpdate = await fetch(AppConfig.apiUrl+"/desechable/"+des._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(des)
    })

    if (desUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getDesechables();
    } else {
      const errorMessage = await desUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Desechable actualizado: ", des);
  }
}
