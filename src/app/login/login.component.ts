import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { LoginModalService } from '../components/login-modal/login-modal.service';
import { RegisterModalService } from '../components/register-modal/register-modal.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;

  auth2: any;

  constructor( public router: Router,
        public _usuarioService: UsuarioService,
        public _modalLogin: LoginModalService,
        public _modalRegister: RegisterModalService ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    console.log('email: ', this.email );
    console.log('Login oculto: ', this._modalLogin.oculto );
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    console.log( usuario );

    this._usuarioService.login( usuario, forma.value.recuerdame )
          .subscribe( correcto => this.router.navigate(['/dashboard']) );
    console.log( forma.valid );
    console.log( forma.value );
  }

  abrirModalLogin( ) {
    console.log('Abrir login');
    this._modalLogin.mostrarModal();
  }

  abrirModalRegister( ) {
    console.log('Abrir register');
    this._modalRegister.mostrarModal();
  }
}
