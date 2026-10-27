import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Componente raíz: muestra la página que indique la ruta */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}
