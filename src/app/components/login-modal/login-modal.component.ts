import { Component, OnInit } from '@angular/core';
import { LoginModalService } from './login-modal.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  titulo: string = 'Ingrese sus credenciales';

  recuerdame: boolean = false;
  email: string;

  constructor(public _modal: LoginModalService,
        public router: Router,
        public _usuarioService: UsuarioService,
        public _modalLogin: LoginModalService) {

        }

  ngOnInit() {

    this.email = localStorage.getItem('email') || '';
    console.log('email: ', this.email );
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  cerrarModal() {

    this._modal.ocultarModal();
  }


  ingresar( forma: NgForm ) {
    console.log('Pedido');
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
          .subscribe( correcto => {
            this.cerrarModal();
            this.router.navigate(['/dashboard']);
           });
    console.log( forma.valid );
    console.log( forma.value );
  }
}
