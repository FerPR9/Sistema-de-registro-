export class Registro {
  _id?: Number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correoElectronico: string;
  telefono: number;
  areaTrabajo: string;
  folio?: string;
  fechaRegistro?: Date;
  foto: any;

  constructor(
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    correoElectronico: string,
    telefono: number,
    areaTrabajo: string,
    foto: any,
    folio?: string,
    fechaRegistro?: Date,
  ) {
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.correoElectronico = correoElectronico;
    this.telefono = telefono;
    this.areaTrabajo = areaTrabajo;
    this.folio = folio;
    this.fechaRegistro = fechaRegistro;
    this.foto = foto;
  }
}
