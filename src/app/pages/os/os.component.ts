import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { OS } from '../../models/os.model';
import { OsServiceService } from '../../services/os/os-service.service';

// declare var swal: any;

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styles: []
})
export class OsComponent implements OnInit {

  oss: OS[] = [];
  desde = 0;
  total = 0;
  cargando = true;
  termino = '';

  date = new Date();

  constructor(
    public _os: OsServiceService  ) { }

  ngOnInit() {
    this.cargarOS();
  }

  escriboBusqueda(termino: string) {

    if (termino.length <= 0) {
      this.cargarOS();
      this.termino = '';
      return;
    }

    this.desde = 0;
    this.termino = termino;
    this.buscarOS( termino, this.desde );
  }

  cargarOS() {
    this.cargando = true;

    this._os.cargarOS( this.desde )
    .subscribe( (resp: any) => {
      console.log(resp);

      this.total = resp.total;
      this.oss = resp.os;
      this.cargando = false;
    });
  }

  buscarOS( termino: string, desde: number ) {
    this._os.buscarOS( termino, desde )
    .subscribe( resp => this.oss = resp);
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.total ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarOS();

  }

  nuevaOS() {

    swal({
      title: 'Crear nueva obra social',
      text: 'Ingrese el nombre de la nueva obra social',
      content: {
        element: 'input'
      },
      buttons: [true, 'Confirmar'],
      dangerMode: true
    })
    .then(name => {

      if (name === '') {
        swal('Error', 'Debe escribir algo', 'error')
        .then( () => this.nuevaOS());
      }

      if (!name) {
        return;
      }

      const os = new OS( name );

      this._os.crearOS(os)
      .subscribe( resp => {
        console.log( resp );
        this.cargarOS();
      });

    });
  }

  borrarOS( os: OS ) {

    swal('Esta seguro?', 'Usted esta a punto de borrar la obra social: ' + os.nombre, 'warning', {
      buttons: [true, 'Confirmar'],
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {

        this._os.borrarOS( os._id )
        .subscribe( borrado => {
          console.log( borrado );
          this.desde = 0;
          this.cargarOS();
        });
      }
    });
  }


  guardarOS( os: OS ) {
    this._os.actualizarOS( os )
    .subscribe();
  }

}
