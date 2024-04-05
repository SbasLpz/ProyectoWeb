import { Component, NgModule } from '@angular/core';
import { IComestible } from '../interface/comestible';
import { ComestibleService } from '../service/proveedores/comestible.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IConsecutivos } from '../interface/consecutivos';
import { ConsecutivosService } from '../service/consecutivos.service';
import { ProveedorService } from '../service/proveedores/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

  //productos: IComestible[] = [];
  productos: IComestible[] = [];
  consecutivos: IConsecutivos[] = [];
  formularioCrear:FormGroup;
  selected = [{
    codigo: "",
    nombre: "",
    cantidad: "",
    tipo: "",
    restaurante: "",
    marca: "",
    clase: "",
    linea: "",
    unidad: "",
    checked: false
  }]

  constructor(private comestiblesService:ComestibleService, private consecutivosService: ConsecutivosService, private proveedorService: ProveedorService){
    this.obtenerProductos();
    this.obtenerConsecutivos();
    this.formularioCrear = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      cedula: new FormControl('',[Validators.required] ),
      ingreso: new FormControl('', [Validators.required]),
      proveedor: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required, Validators.max(50)]),
      segundoApellido: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),

      telOficina: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telPersonal: new FormControl('', [Validators.required]),

      productos: new FormControl([], Validators.required),

      nombreContacto: new FormControl('', [Validators.required]),
      telContacto: new FormControl('', [Validators.required]),
      correoContacto: new FormControl('', [Validators.required, Validators.email])
    })
  }
  
  obtenerConsecutivos(){
    this.consecutivosService.getConsecutivos().subscribe((consecutivos:IConsecutivos[])=>{
      this.consecutivos = consecutivos;
    })
  }

  obtenerProductos(){
    this.comestiblesService.getComestibles().subscribe((productos:IComestible[])=>{
      this.productos = productos;
      this.productos.forEach(producto => producto.checked = false);
    })
    console.log("Prodcutos lenght: "+this.productos.length)
  }

  addToList(){
    console.log("PPPP: ", this.productos)
    var t = this.productos
    .filter(item => item.checked)
    .map(item => item);
    this.selected = t;
    console.log("SELECTED: ", this.selected)
    this.formularioCrear.get('productos')?.setValue(this.selected)
  }

  submit(e:Event):void{
    e.preventDefault();
    if (this.formularioCrear.valid) {
      this.proveedorService.addProveedor(this.formularioCrear.value)
      .subscribe(
        (data) => {
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('La solicitud fue exitosa:', data);
          alert("Se creo el proveedor exitosamente");
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

  updateChecked(index: number, event: any) {
    const isChecked = event.target.checked;
    this.productos[index].checked = isChecked;
    
  }

  arroba = "@"

  telValido(event:Event, controlName:string):void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;
    const patron = /^\d*$/;

    // if (valor.length > 8) {
    //   valor = valor.slice(0, 8);
    // }
    if (valor.length !== 8) {
      this.formularioCrear.get(controlName)?.setErrors({ 'incorrectLength': true });
    } else {
      this.formularioCrear.get(controlName)?.setErrors(null); 
    }

    if (!patron.test(valor)) {
      input.value = valor.replace(/\D/g, '');
    }
  }

}
