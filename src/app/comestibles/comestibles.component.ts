import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../globals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comestibles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comestibles.component.html',
  styleUrl: './comestibles.component.css'
})
export class ComestiblesComponent implements OnInit {

  comestibles = [{
    _id: 0,
    codigo:"",
    nombre:"",
    cantidad: "",
    tipo: 0,
    restaurante: "",
    marca: "",
    clase: "",
    linea: "",
    unidad: "",
    editMode: true
  }]

  comestible = {
    _id: 0,
    codigo:"",
    nombre:"",
    cantidad: "",
    tipo: 0,
    restaurante: "",
    marca: "",
    clase: "",
    linea: "",
    unidad: "",
    editMode: true
  }

  ngOnInit(): void {
    this.getComestibles();
  }

  async getComestibles(){

    const get = await fetch(AppConfig.apiUrl+"/comestibles", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.comestibles = await get.json();
      console.log(this.comestibles)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  toggleEditMode(comestible: any) {
    comestible.editMode = !comestible.editMode;
  }

  async eliminar(comestible: any){
    console.log("Eliminando elemento: "+comestible.nombre)
    const confirmacion = window.confirm("¿Desea eliminar el comestible "+comestible.nombre+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/comestible/"+comestible._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (remove.ok) {
      alert("Se elimino el elemento correctamente")
      this.getComestibles();
    } else {
      const errorMessage = await remove.text();
      alert('Error al eliminar: '+errorMessage)
    }
  }

  async actualizar(comestible:any){

    // if (consec.prefijoDisponible && consec.prefijo == "-" || consec.prefijo.trim() == "") {
    //   return alert("Tiene que ingresar el prefijo")
    // }

    // if (!consec.prefijoDisponible) {
    //   consec.prefijo = "-";
    // }

    const consecUpdate = await fetch(AppConfig.apiUrl+"/comestible/"+comestible._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comestible)
    })

    if (consecUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getComestibles();
    } else {
      const errorMessage = await consecUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Consecutivo actualizo: ", comestible);
  }

}
