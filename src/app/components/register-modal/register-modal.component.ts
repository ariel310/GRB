import { Component, OnInit } from '@angular/core';
import { RegisterModalService } from './register-modal.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';

declare var swal: any;


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  titulo = 'Registro de nuevo usuario';
  forma: FormGroup;

  constructor(public _modal: RegisterModalService,
      public _usuarioService: UsuarioService,
      public router: Router) { console.log('abrio register'); }

  sonIguales( campo1: string, campo2: string ) {


    return ( group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup( {
      nombre: new FormControl( null, Validators.required),
      apellido: new FormControl( null, Validators.required),
      username: new FormControl( null, Validators.required),
      email: new FormControl( null, [ Validators.required, Validators.email ]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password' , 'password2' ) });

    this.forma.setValue({
      nombre: 'Test1',
      apellido: 'Test1',
      username: 'test1',
      email: 'test1@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

cerrarModal() {
  this._modal.ocultarModal();
}

registrarUsuario() {

  if ( this.forma.invalid ) {
    return;
  }

  if ( !this.forma.value.condiciones ) {
    swal('Importante', 'Debe aceptar las condiciones', 'warning');
    return;
  }

  const usuario = new Usuario(
    this.forma.value.nombre,
    this.forma.value.email,
    this.forma.value.password
  );

  this._usuarioService.crearUsuario( usuario ).subscribe(resp => {
    console.log( resp );
    this.router.navigate(['/login']);
  });
}
}
