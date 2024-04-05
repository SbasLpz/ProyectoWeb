import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearConsecutivosComponent } from './crear-consecutivos/crear-consecutivos.component';
import { AppConfig } from '../globals';
import { ConsecutivosComponent } from "./consecutivos/consecutivos.component";
import { CrearComestiblesComponent } from './crear-comestibles/crear-comestibles.component';
import { ComestiblesComponent } from './comestibles/comestibles.component';
import { CrearDesechablesComponent } from './crear-desechables/crear-desechables.component';
import { DesechablesComponent } from './desechables/desechables.component';
import { CrearLimpiezaComponent } from './crear-limpieza/crear-limpieza.component';
import { LimpiezaComponent } from './limpieza/limpieza.component';
import { CrearTecnologiaComponent } from './crear-tecnologia/crear-tecnologia.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, CrearConsecutivosComponent, ConsecutivosComponent, CrearComestiblesComponent, 
      ComestiblesComponent, CrearDesechablesComponent, DesechablesComponent, CrearLimpiezaComponent, LimpiezaComponent,
    CrearTecnologiaComponent, TecnologiasComponent, CrearProveedorComponent, ProveedoresComponent]
})
export class AppComponent {
  title = 'ProyectoFinalWeb';
}
