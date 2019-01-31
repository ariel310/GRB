import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  subirArchivo: File;

  imagenTemp: any;

  titulo: string;

  constructor(
    public _subirArchivo: SubirArchivoService,
    public _modalUpload: ModalUploadService
  ) { this.setearTitulo(); }

  ngOnInit() {
  }

  setearTitulo() {

    switch ( this._modalUpload.tipo ) {

      case 'usuarios':
        this.titulo = 'Cambiar imágen del usuario';
        break;

      case 'medicos':
        this.titulo = 'Cambiar imágen del hospital';
        break;

      case 'hospitales':
        this.titulo = 'Cambiar imágen del médico';
        break;

    }
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

  cerrarModal() {
    this.imagenTemp = null;
    this.subirArchivo = null;
    (<HTMLInputElement>document.getElementById('imagen')).value = '';
    this._modalUpload.ocultarModal();
  }

  subirImagen() {
    this._subirArchivo.subirArchivo( this.subirArchivo, this._modalUpload.tipo, this._modalUpload.id)
    .then( resp => {
      console.log( resp );
      this._modalUpload.notification.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga');
    });
  }
}
