import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComunicacionService {
  private busquedaSource = new Subject<string>();
  busqueda$ = this.busquedaSource.asObservable();

  enviarBusqueda(valor: string) {
    this.busquedaSource.next(valor); // cada llamada es independiente
  }


}



