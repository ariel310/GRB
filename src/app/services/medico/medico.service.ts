import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  total = 0;

  constructor(
    public http: HttpClient,
    public _usuario: UsuarioService
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
    .pipe( map( (resp: any) => {
      this.total = resp.total;
      return resp.medicos;
    }));
  }

  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
    .pipe( map( (resp: any) => resp.medico ));
  }

  buscarMedico( termino: string, desde: number ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino + '?desde=' + desde;
    console.log('Buscar');
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.medico ));
  }

  borrarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuario.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      swal('Médico borrado', 'El médico ha sido borrado existosamente', 'success');
      return true;
    }));
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizo
      url += '/' + medico._id;
      url += '?token=' + this._usuario.token;

      return this.http.put ( url, medico )
      .pipe( map( (resp: any) => {
        console.log('RESP', resp );
        swal('Medico actualizado', medico.nombre, 'success');
        return resp.medico;
      }));

    } else {
      // Creo
      url += '?token=' + this._usuario.token;

      return this.http.post( url, medico )
      .pipe( map( (resp: any) => {
        swal('Medico creado', medico.nombre, 'success');
        return resp.medico;
      }));
    }

  }
}
