import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppConfig } from '../../globals';

@Component({
  selector: 'app-crear-consecutivos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-consecutivos.component.html',
  styleUrl: './crear-consecutivos.component.css'
})
export class CrearConsecutivosComponent {

  consecutivo = {
    tipo: "",
    descripcion: "",
    valor: 0,
    prefijo: "",
    prefijoDisponible: false
  }

  consecutivos = [{}]

  prefijoDisponible = false;

  async agregar(){

    if (this.notNullsFields()) return alert("Los campos no pueden ir vacios.");

    this.consecutivo.prefijo = this.consecutivo.prefijo.trim().toUpperCase()+"-";
    console.log("Guardando en la base de datos....");

    if (this.consecutivo.prefijo != '-'){
      const existeConsecutivo = await fetch(AppConfig.apiUrl+"/existeConsecutivo/"+this.consecutivo.prefijo)
      
      if (existeConsecutivo.ok) {
        const existeConsecutivoData = await existeConsecutivo.json();
        if(existeConsecutivoData.success) return alert("El prefijo de consecutivo ya se encuentra registrado.");
        this.consecutivo.prefijo = "";
      }
    }

    const add = await fetch(AppConfig.apiUrl+"/consecutivo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.consecutivo)
    })

    if (add.ok) {
      alert('Consecutivo agregado exitosamente !!!')
    } else {
      const errorMessage = await add.text();
      alert('Error: '+errorMessage)
    }
    
    this.limpiar();
  }

  limpiar():void {
    this.consecutivo.tipo = "";
    this.consecutivo.descripcion = "";
    this.consecutivo.valor = 0;
    this.consecutivo.prefijo = "";
    
  }

  consecutivoValido(event:Event):void {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    const patron = /^[a-zA-Z]*$/;

    if (!patron.test(valor)) {
      input.value = valor.slice(0, -1);
    }
  }

  notNullsFields(){
    if (this.consecutivo.descripcion == "" || this.consecutivo.tipo == "") {
      return true;
    } else {
      return false;
    }
  }

  checkboxCambio(checkbox: HTMLInputElement):void {
    if (checkbox.checked) {
      this.prefijoDisponible = true;
      this.consecutivo.prefijoDisponible = true;
      console.log("tienePrefijo en true");
    } else {
      this.prefijoDisponible = false;
      this.consecutivo.prefijoDisponible = false;
      console.log("tienePrefijo en false");
      this.consecutivo.prefijo = '';
    }
  }

  setValues() {
    console.log("buenas");
  }

}
