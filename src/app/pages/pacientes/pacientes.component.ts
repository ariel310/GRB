import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/service.index';
import swal from 'sweetalert';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements OnInit {

  paciente: Paciente[];
  termino: string;
  desde = 0;

  constructor(public _paciente: PacienteService) {

  }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this._paciente.cargarPacientes()
    .subscribe( pacientes => this.paciente = pacientes );
  }

  escriboBusqueda( termino: string ) {
    if (termino.length <= 0) {
      this.cargarPacientes();
      this.termino = '';
      return;
    }

    this.desde = 0;
    this.termino = termino;
    this.buscarPaciente( termino, this.desde );
  }

  buscarPaciente( termino: string, desde: number ) {
    this._paciente.buscarPaciente( termino, desde )
    .subscribe( resp => this.paciente = resp);
  }

    abrirModal( id: string ) {}

    guardarPaciente( paciente: Paciente ) {}

    borrarPaciente( paciente: Paciente ) {
        swal({
          title: 'Esta seguro?',
          text: 'Usted esta a punto de borrar el paciente: ' + paciente.nombre,
          icon: 'warning',
          buttons: [true, 'Confirmar'],
          dangerMode: true
        })
        .then( borrar => {

          if (borrar) {

            this._paciente.borrarPaciente( paciente._id )
            .subscribe( borrado => {
              console.log( borrado );
              this.desde = 0;
              this.cargarPacientes();
            });
          }
        });
    }
}
