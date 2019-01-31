import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild('input') inputValue: ElementRef;

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;
  termino: string = '';

  constructor(public _usuario: UsuarioService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUpload.notification.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuario.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      console.log(resp);

      this.total = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
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
    const termino = this.inputValue.nativeElement.value;

    this.desde += valor;

    if (this.termino.length <= 0) {
      this.cargarUsuarios();
    } else {
      this.buscarUsuario();
    }
  }


  escriboBusqueda(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      this.termino = '';
      return;
    }

    this.desde = 0;
    this.termino = termino;
    this.buscarUsuario();
  }

  buscarUsuario() {

    this.cargando = true;

    this._usuario.buscarUsuarios( this.termino, this.desde )
    .subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuario.usuario._id ) {
      swal('Error al borrar usuario', 'No puede borrarse a usted mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Usted esta a punto de borrar el usuario: ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {

        this._usuario.borrarUsuario( usuario._id )
        .subscribe( borrado => {
          console.log( borrado );
          this.desde = 0;
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuario.actualizarUsuario( usuario )
    .subscribe();
  }

  abrirModal( id: string, imagen: any ) {
    this._modalUpload.mostrarModal( 'usuarios', id, imagen );
  }
}
