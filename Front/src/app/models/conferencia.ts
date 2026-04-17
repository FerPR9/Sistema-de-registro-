export class Conferencia {
  _id?: Number;
  nombreConferencia: string;
  nombreConferencista: string;
  fechaConferencia: Date;
  lugarConferencia: string;
  cupoConferencia: number;
  fotoConferencista: any;
  experienciaConferencista: string;

  constructor(
    nombreConferencia: string,
    nombreConferencista: string,
    fechaConferencia: Date,
    lugarConferencia: string,
    cupoConferencia: number,
    fotoConferencista: any,
    experienciaConferencista: string,
  ) {
    this.nombreConferencia = nombreConferencia;
    this.nombreConferencista = nombreConferencista;
    this.fechaConferencia = fechaConferencia;
    this.lugarConferencia = lugarConferencia;
    this.cupoConferencia = cupoConferencia;
    this.fotoConferencista = fotoConferencista;
    this.experienciaConferencista = experienciaConferencista;
  }
}
