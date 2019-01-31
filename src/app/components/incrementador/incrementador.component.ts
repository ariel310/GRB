import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda input', this.leyenda);
    console.log('porcentaje input', this.porcentaje);
  }
  ngOnInit() {
  }

  onChange( newValue: number ) {

    // let elemHTML = document.getElementsByName('porcentaje')[0];

    // console.log( this.txtProgress );

    this.porcentaje = newValue;
    if (newValue >= 100 ) {
      this.porcentaje = 100;
    } else if (newValue <= 0 ) {
      this.porcentaje = 0;
    }

    // elemHTML.value = Number( this.porcentaje );
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );

  }

  cambiarValor( valor ) {
    if ( this.porcentaje >= 100 ) {
      if ( valor < 0 ) {
        this.porcentaje = this.porcentaje + valor;
      } else {
        return;
      }
    } else if ( this.porcentaje <= 0 ) {
      if ( valor > 0 ) {
        this.porcentaje = this.porcentaje + valor;
      } else {
        return;
      }
    } else {
      this.porcentaje = this.porcentaje + valor;
    }
    this.cambioValor.emit( this.porcentaje );
    this.txtProgress.nativeElement.focus();
  }

}
