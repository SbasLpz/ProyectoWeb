import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppConfig } from '../../globals';

@Component({
  selector: 'app-consecutivos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './consecutivos.component.html',
  styleUrl: './consecutivos.component.css'
})
export class ConsecutivosComponent implements OnInit {

  ngOnInit(): void {
    this.getConsecutivos();
  }

  consecutivos = [{
    idn:0,
    tipo:"",
    descripcion: "",
    valor: 0,
    prefijo: "",
    prefijoDisponible: false,
    editMode: true
  }]

  consecutivo = {
    idn:0,
    tipo:"",
    descripcion: "",
    valor: 0,
    prefijo: "",
    prefijoDisponible: false
  }

  async getConsecutivos(){

    console.log("Guardando en la base de datos....");
    
    const get = await fetch(AppConfig.apiUrl+"/consecutivos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.consecutivos = await get.json();
      console.log(this.consecutivos)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  async eliminar(id:Number){
    console.log("Eliminando elemento: "+id)
    const confirmacion = window.confirm("¿Desea eliminar el consecutivo "+id+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/consecutivo/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (remove.ok) {
      alert("Se eleimino el elemento correctamente")
      this.getConsecutivos();
    } else {
      const errorMessage = await remove.text();
      alert('Error al eliminar: '+errorMessage)
    }
  }

  toggleEditMode(consecutivo: any) {
    consecutivo.editMode = !consecutivo.editMode;
  }

  async actualizar(consec:any){

    if (consec.prefijoDisponible && consec.prefijo == "-" || consec.prefijo.trim() == "") {
      return alert("Tiene que ingresar el prefijo")
    }

    if (!consec.prefijoDisponible) {
      consec.prefijo = "-";
    }

    const consecUpdate = await fetch(AppConfig.apiUrl+"/consecutivo/"+consec.idn, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(consec)
    })

    if (consecUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getConsecutivos();
    } else {
      const errorMessage = await consecUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Consecutivo actualizo: ", consec);
  }

  consecutivoValido(event:Event):void {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    const patron = /^[a-zA-Z]*$/;

    if (!patron.test(valor)) { 
      input.value = valor.slice(0, -1);
    }
  }

}
