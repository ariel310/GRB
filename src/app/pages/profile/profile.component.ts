import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  subirArchivo: File;

  imagenTemp: any;

  constructor(
    public _usuario: UsuarioService
  ) {
    this.usuario = _usuario.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {
    console.log(usuario);

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuario.actualizarUsuario( this.usuario )
          .subscribe();
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.subirArchivo = archivo;
      this.imagenTemp = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo se pueden seleccionar imagenes', 'El archivo seleccionado no es una imágen', 'error');
      this.subirArchivo = null;
      this.imagenTemp = null;
      return;
    }
    this.subirArchivo = archivo;

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    console.log('Subir');
    this._usuario.cambiarImagen( this.subirArchivo, this.usuario._id );
  }
}
