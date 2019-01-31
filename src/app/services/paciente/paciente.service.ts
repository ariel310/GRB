import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import { Paciente } from '../../models/paciente.model';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  total = 0;

  constructor(
    public http: HttpClient,
    public _usuario: UsuarioService
  ) { }

  cargarPacientes() {

    const url = URL_SERVICIOS + '/paciente';

    return this.http.get( url )
    .pipe( map( (resp: any) => {
      this.total = resp.total;
      return resp.paciente;
    }));
  }

  cargarPaciente( id: string ) {
    const url = URL_SERVICIOS + '/paciente/' + id;

    return this.http.get( url )
    .pipe( map( (resp: any) => resp.paciente ));
  }

  buscarPaciente( termino: string, desde: number ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/paciente/' + termino + '?desde=' + desde;
    console.log('Buscar');
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.paciente ));
  }

  borrarPaciente( id: string ) {

    const url = URL_SERVICIOS + '/paciente/' + id + '?token=' + this._usuario.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      swal('Paciente borrado', 'El paciente ha sido borrado existosamente', 'success');
      return true;
    }));
  }

  guardarPaciente( paciente: Paciente ) {

    let url = URL_SERVICIOS + '/paciente';

    if ( paciente._id ) {
      // Actualizo
      url += '/' + paciente._id;
      url += '?token=' + this._usuario.token;

      return this.http.put ( url, paciente )
      .pipe( map( (resp: any) => {
        console.log('RESP', resp );
        swal('Paciente actualizado', paciente.nombre, 'success');
        return resp.paciente;
      }));

    } else {
      // Creo
      url += '?token=' + this._usuario.token;

      return this.http.post( url, paciente )
      .pipe( map( (resp: any) => {
        swal('Paciente creado', paciente.nombre, 'success');
        return resp.paciente;
      }));
    }

  }
}

