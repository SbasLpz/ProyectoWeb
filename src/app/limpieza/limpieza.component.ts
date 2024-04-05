import { Component, OnInit } from '@angular/core';
import { ConsecutivosService } from '../service/consecutivos.service';
import { IConsecutivos } from '../interface/consecutivos';
import { AppConfig } from '../../globals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-limpieza',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './limpieza.component.html',
  styleUrl: './limpieza.component.css'
})
export class LimpiezaComponent implements OnInit{

  consecutivos: IConsecutivos[] = [];

  limpiezas = [{
    _id: 0,
    codigo:"",
    restaurante: "",
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    tipo:  "",
    cantidadMedida:  0,
    unidad: "",
    editMode: true
  }]

  limpieza = {
    _id: 0,
    codigo:"",
    restaurante: "",
    nombre: "",
    marca: "",
    cantidad: 0,
    descripcion: "",
    tipo:  "",
    cantidadMedida:  0,
    unidad: "",
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
    const get = await fetch(AppConfig.apiUrl+"/limpiezas", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.limpiezas = await get.json();
      console.log(this.limpiezas)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  toggleEditMode(lim: any) {
    lim.editMode = !lim.editMode;
  }

  async eliminar(lim: any){
    console.log("Eliminando elemento: "+lim.nombre)
    const confirmacion = window.confirm("¿Desea eliminar el utensilio "+lim.nombre+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/limpieza/"+lim._id, {
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

  async actualizar(lim:any){
    const desUpdate = await fetch(AppConfig.apiUrl+"/limpieza/"+lim._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lim)
    })

    if (desUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getUtensilios();
    } else {
      const errorMessage = await desUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Desechable actualizado: ", lim);
  }

}
