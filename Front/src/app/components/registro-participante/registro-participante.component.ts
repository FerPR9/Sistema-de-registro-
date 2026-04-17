import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registro } from 'src/app/models/registro';
import { registroService } from 'src/app/services/registro.service';
import { AreaTrabajoService } from 'src/app/services/areaTrabajo.service';
import { SeleccionService } from 'src/app/services/seleccion.service';
import { MantenerEstadoService } from 'src/app/services/mantenerEstado..service';

@Component({
  selector: 'app-registro-participante',
  templateUrl: './registro-participante.component.html',
  styleUrls: ['./registro-participante.component.css'],
})
export class RegistroParticipanteComponent implements OnInit {
  registroForm: FormGroup;
  areasDeTrabajo: any[] = [];
  conferenciaSeleccionadaId: string = '';
  tipoSeleccion: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _registroService: registroService,
    private _areaTrabajoService: AreaTrabajoService,
    private _seleccionService: SeleccionService,
    private mantenerEstadoService: MantenerEstadoService,
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      areaTrabajo: ['', Validators.required],
      //foto: ['', Validators.required],
      foto: [null, Validators.required],
      conferenciaId: [''],
    });
  }

  ngOnInit(): void {
    this.cargarAreasDeTrabajo();
    //const seleccionadoId = this._seleccionService.getSeleccionadoId();
    this.conferenciaSeleccionadaId = this._seleccionService.getSeleccionadoId();
    this.tipoSeleccion = this._seleccionService.getTipo();
    // Cargar los datos guardados si existen
    const savedData = this.mantenerEstadoService.getFormData();
    if (savedData) {
      this.registroForm.patchValue(savedData);
    }
  }

  cargarAreasDeTrabajo() {
    this._areaTrabajoService.obtenerAreasDeTrabajo().subscribe(
      (areasDeTrabajo) => {
        // Directamente asigna la respuesta a la propiedad, ya que esperamos un array
        this.areasDeTrabajo = areasDeTrabajo;
        console.log('Áreas de trabajo cargadas:', this.areasDeTrabajo); // Esto es para depuración
      },
      (error) => {
        console.error('Error al obtener áreas de trabajo', error);
      },
    );
  }
  registrarParticipante() {
    //console.log(this.registroForm)
    //console.log(this.registroForm.get('participante')?.value);
    this.mantenerEstadoService.setFormData(this.registroForm.value);

    const id = this._seleccionService.getSeleccionadoId();
    const tipo = this._seleccionService.getTipo();

    const REGISTRO: Registro = {
      ...this.registroForm.value,
      //conferenciaId: this.conferenciaSeleccionadaId,
      conferenciaId: tipo === 'conferencia' ? id : null,
      tallerId: tipo === 'taller' ? id : null,
      nombre: this.registroForm.get('nombre')?.value,
      apellidoPaterno: this.registroForm.get('apellidoPaterno')?.value,
      apellidoMaterno: this.registroForm.get('apellidoMaterno')?.value,
      correoElectronico: this.registroForm.get('correoElectronico')?.value,
      telefono: this.registroForm.get('telefono')?.value,
      areaTrabajo: this.registroForm.get('areaTrabajo')?.value,
      foto: this.registroForm.get('foto')?.value,
    };
    console.log(REGISTRO);
    this._registroService.guardarRegistro(REGISTRO).subscribe(
      (data) => {
        this.toastr.success(
          'El participante fue registrado con exito!',
          'registrado',
        );
        this.mantenerEstadoService.clearFormData();
        this.router.navigate(['/lista-participantes']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(
          error.error.msg || 'Error al registrar el participante',
        );
        this.registroForm.reset();
      },
    );
    console.log('ID:', id);
    console.log('TIPO:', tipo);
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.registroForm.patchValue({
          foto: e.target?.result,
        });
        this.registroForm.get('foto')?.markAllAsTouched();
      };
      reader.readAsDataURL(file);
    }
  }
}
