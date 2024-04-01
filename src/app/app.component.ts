import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearConsecutivosComponent } from './crear-consecutivos/crear-consecutivos.component';
import { AppConfig } from '../globals';
import { ConsecutivosComponent } from "./consecutivos/consecutivos.component";
import { CrearComestiblesComponent } from './crear-comestibles/crear-comestibles.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, CrearConsecutivosComponent, ConsecutivosComponent, CrearComestiblesComponent]
})
export class AppComponent {
  title = 'ProyectoFinalWeb';
}
