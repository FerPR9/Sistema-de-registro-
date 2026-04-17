// seleccion.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeleccionService {
  private seleccionadoId: string = '';
  private tipo: string = '';

  constructor() {}

  public setSeleccionadoId(id: string, tipo: string) {
    this.seleccionadoId = id;
    this.tipo = tipo;
  }

  public getSeleccionadoId(): string {
    return this.seleccionadoId;
  }

  public getTipo(): string {
    return this.tipo;
  }
}
