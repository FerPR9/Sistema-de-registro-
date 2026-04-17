import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/models/taller';
import { tallerService } from 'src/app/services/taller.service';
import { Router } from '@angular/router';
import { SeleccionService } from 'src/app/services/seleccion.service';

@Component({
  selector: 'app-lista-taller',
  templateUrl: './lista-taller.component.html',
  styleUrls: ['./lista-taller.component.css'],
})
export class ListaTallerComponent implements OnInit {
  listTaller: Taller[] = [];

  constructor(
    private _tallerService: tallerService,
    private _seleccionService: SeleccionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.obtenerTalleres();
  }

  obtenerTalleres() {
    this._tallerService.getTaller().subscribe(
      (data) => {
        console.log(data);
        this.listTaller = data;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  seleccionarTaller(id: any) {
    console.log('ID taller seleccionado:', id);
    this._seleccionService.setSeleccionadoId(id, 'taller');
    this.router.navigate(['/registro-participante']);
  }
}
