import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService
  ) { this.cargarStorage(); }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( resp: any ) {

    localStorage.setItem('id', resp.id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

    this.usuario = resp.usuario;
    this.token = resp.token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token: token } )
    .pipe(map( (resp: any) => {
      this.guardarStorage( resp );
      return true;
  }));
}

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
        localStorage.setItem( 'email', usuario.email );
    } else {
       localStorage.removeItem( 'email' );
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(map( (resp: any) => {
        this.guardarStorage( resp );
        console.log('Service OK!');
        return true;

    }));
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
        .pipe(map( (resp: any) => {
          swal('Usuario Creado', usuario.email, 'success');
          return resp.usuario;
        }));
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
            .pipe(map( (resp: any) => {

              if ( usuario._id === this.usuario._id ) {
                resp['token'] = this.token;
                resp['id'] = resp.usuario._id;

                this.guardarStorage( resp );
              }

              swal('Usuario actualizado', usuario.nombre, 'success');

              return true;
            }));
  }

  cambiarImagen( file: File, id: string ) {

    this._subirArchivo.subirArchivo( file, 'usuarios', id )
    .then( (resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuarios.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');

      const send = {
        token: this.token,
        id: id,
        usuario: this.usuario
      };

      this.guardarStorage( send );
    })
    .catch( resp => {
      console.log(resp);
    });
  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    console.log('Cargar');
    return this.http.get(url);
  }

  buscarUsuarios( termino: string, desde: number ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino + '?desde=' + desde;
    console.log('Buscar');
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.usuario ));
  }

  borrarUsuario( id: string ) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      swal('Usuario borrado', 'El usuario ha sido borrado existosamente', 'success');
      return true;
    }));
  }
}


