import { Injectable } from '@angular/core';
import { OS } from '../../models/os.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class OsServiceService {

  os: OS;
  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public _usuario: UsuarioService
  ) { }

  cargarOS( desde: number = 0, limit: number = 5 ) {

    const url = URL_SERVICIOS + '/os' + '?limit=' + limit + '&desde=' + desde;
    return this.http.get( url );
  }

  obternerOS( id: string ) {

    const url = URL_SERVICIOS + '/os/' + id;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.os));
  }

  borrarOS( id: string ) {

    const url = URL_SERVICIOS + '/os/' + id + '?token=' + this._usuario.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      swal('Obra social borrada', 'La obra social ha sido borrado existosamente', 'success');
      return true;
    }));
  }

  crearOS( os: OS ) {
    const url = URL_SERVICIOS + '/os?token=' + this._usuario.token;
    return this.http.post( url, os )
        .pipe(map( (resp: any) => {
          swal('Obra social creada', os.nombre, 'success');
          return resp.os;
        }));
  }

  actualizarOS( os: OS ) {

    let url = URL_SERVICIOS + '/os/' + os._id;
    url += '?token=' + this._usuario.token;

    return this.http.put( url, os )
            .pipe(map( (resp: any) => {

              swal('Obra social actualizada', os.nombre, 'success');

              return true;
            }));
  }

  buscarOS( termino: string, desde: number ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/os/' + termino + '?desde=' + desde;
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.os ));
  }

}
