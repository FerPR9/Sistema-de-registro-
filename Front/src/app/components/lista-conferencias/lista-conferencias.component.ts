import { Component, OnInit } from '@angular/core';
import { Conferencia } from 'src/app/models/conferencia';
import { conferenciaService } from 'src/app/services/conferencia.service';
import { Router } from '@angular/router';
import { SeleccionService } from 'src/app/services/seleccion.service';

@Component({
  selector: 'app-lista-conferencias',
  templateUrl: './lista-conferencias.component.html',
  styleUrls: ['./lista-conferencias.component.css'],
})
export class ListaConferenciasComponent implements OnInit {
  listConferencia: Conferencia[] = [];

  constructor(
    private _conferenciaService: conferenciaService,
    private _seleccionService: SeleccionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.obtenerConferencias();
  }

  obtenerConferencias() {
    this._conferenciaService.getConferencia().subscribe(
      (data) => {
        console.log(data);
        this.listConferencia = data;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  seleccionarConferencia(id: any) {
    console.log('Conferencia seleccionada:', id);
    this._seleccionService.setSeleccionadoId(id, 'conferencia');
    this.router.navigate(['/registro-participante']);
  }
}
