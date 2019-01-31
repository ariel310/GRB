import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  termino: string;
  desde: number = 0;

  constructor(
    public _medico: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos() {
    this._medico.cargarMedicos()
    .subscribe( medicos => this.medicos = medicos );
  }

  escriboBusqueda( termino: string ) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      this.termino = '';
      return;
    }

    this.desde = 0;
    this.termino = termino;
    this.buscarMedico( termino, this.desde );
  }

  buscarMedico( termino: string, desde: number ) {
    this._medico.buscarMedico( termino, desde )
    .subscribe( resp => this.medicos = resp);
  }

    abrirModal( id: string, img: string) {}

    guardarMedico( medico: Medico ) {}

    borrarMedico( medico: Medico ) {
        swal({
          title: 'Esta seguro?',
          text: 'Usted esta a punto de borrar el medico: ' + medico.nombre,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
        .then( borrar => {

          if (borrar) {

            this._medico.borrarMedico( medico._id )
            .subscribe( borrado => {
              console.log( borrado );
              this.desde = 0;
              this.cargarMedicos();
            });
          }
        });
    }

}
