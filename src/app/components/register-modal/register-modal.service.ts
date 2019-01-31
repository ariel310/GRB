import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterModalService {

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
    console.log('Register', this.oculto);
  }
}
