import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';

import { map } from 'rxjs/internal/operators/map';
import { Usuario } from '../../models/usuario.model';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient
  ) { this.cargarStorage(); }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cargarHospitales( desde: number = 0, limit: number = 5 ) {

    const url = URL_SERVICIOS + '/hospital' + '?limit=' + limit + '&desde=' + desde;
    return this.http.get( url );
  }

  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.hospital));
  }

  borrarHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      swal('Hospital borrado', 'El hospital ha sido borrado existosamente', 'success');
      return true;
    }));
  }

  crearHospital( hospital: Hospital ) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;
    return this.http.post( url, hospital )
        .pipe(map( (resp: any) => {
          swal('Hospital Creado', hospital.nombre, 'success');
          return resp.hospital;
        }));
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital )
            .pipe(map( (resp: any) => {

              swal('Hospital actualizado', hospital.nombre, 'success');

              return true;
            }));
  }

  buscarHospital( termino: string, desde: number ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino + '?desde=' + desde;
    console.log('Buscar');
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.hospital ));
  }

}
