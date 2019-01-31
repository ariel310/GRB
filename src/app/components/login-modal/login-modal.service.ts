import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  public tipo: string;
  public id: string;
  public img: string;

  public oculto: string = 'oculto';

  public notification = new EventEmitter<any>();
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';

  }

  mostrarModal( ) {

    this.oculto = '';
    console.log('Login', this.oculto);
  }
}
