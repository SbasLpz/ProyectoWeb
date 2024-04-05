import { Component } from '@angular/core';
import { IConsecutivos } from '../interface/consecutivos';
import { ProveedorService } from '../service/proveedores/proveedor.service';
import { AppConfig } from '../../globals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsecutivosService } from '../service/consecutivos.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  consecutivos: IConsecutivos[] = [];

  proveedores = [{
    _id: 0,
    codigo:"",
    cedula: "",
    ingreso: "",
    proveedor: "",
    primerApellido: "",
    segundoApellido: "",
    correo:"",
    direccion: "",
    telOficina: "",
    telPersonal: "",
    productos: "",
    nombreContacto: "",
    telContacto: "",
    correoContacto: "",
    editMode: true
  }]

  proveedor = {
    _id: 0,
    codigo:"",
    cedula: "",
    ingreso: "",
    proveedor: "",
    primerApellido: "",
    segundoApellido: "",
    correo:"",
    direccion: "",
    telOficina: "",
    telPersonal: "",
    productos: "",
    nombreContacto: "",
    telContacto: "",
    correoContacto: "",
    editMode: true
  }

  constructor(private proveedorService:ProveedorService, private consecutivosService:ConsecutivosService){
    //this.obtenerProveedores();
    this.obtenerConsecutivos();
  }

  ngOnInit(): void {
    this.getProveedores();
  }

  obtenerConsecutivos(){
    this.consecutivosService.getConsecutivos().subscribe((consecutivos:IConsecutivos[])=>{
      this.consecutivos = consecutivos;
    })
  }
  
  async getProveedores(){
    const get = await fetch(AppConfig.apiUrl+"/proveedores", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (get.ok) {
      //alert('Consecutivo agregado exitosamente !!!')
      this.proveedores = await get.json();
      console.log(this.proveedores)
    } else {
      const errorMessage = await get.text();
      alert('Error: '+errorMessage)
    }
  }

  toggleEditMode(lim: any) {
    lim.editMode = !lim.editMode;
  }

  async eliminar(prov: any){
    console.log("Eliminando elemento: "+prov.proveedor)
    const confirmacion = window.confirm("¿Desea eliminar el proveedor "+prov.proveedor+"?");

    if(!confirmacion) return;

    const remove = await fetch(AppConfig.apiUrl+"/proveedor/"+prov._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (remove.ok) {
      alert("Se elimino el elemento correctamente")
      this.getProveedores();
    } else {
      const errorMessage = await remove.text();
      alert('Error al eliminar: '+errorMessage)
    }
  }

  async actualizar(prov:any){
    const provUpdate = await fetch(AppConfig.apiUrl+"/proveedor/"+prov._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prov)
    })

    if (provUpdate.ok) {
      alert("Se actualizo correctamente")
      this.getProveedores();
    } else {
      const errorMessage = await provUpdate.text();
      alert('Error al actualizar: '+errorMessage)
    }

    console.log("Proveedor actualizado: ", prov);
  }
}
