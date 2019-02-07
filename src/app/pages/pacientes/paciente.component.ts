import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { OsServiceService } from '../../services/os/os-service.service';
import { OS } from '../../models/os.model';

const oss = ['Osde', 'Medife', 'Swiss Medical', 'Federada Salud', 'IAPOS', 'Italmedic'];

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {

  paciente = new Paciente('', '', '', '', '', '', '', '', '', null, '', '', '', '', '');
  oss: OS[] = [];

  public query3 = '';
  public staticList = [
    'guitar',
    'drums',
    'bass',
    'electric guitars',
    'keyboards',
    'mic',
    'bass guitars',
    'trumpet',
    'horns',
    'guitar workshops',
    'pedals'
  ];

  constructor( public _os: OsServiceService ) { }

  ngOnInit() {
    this.cargarOS();
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : oss.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  ingresar( f ) {

  }

  public handleStaticResultSelected (result) {
    this.query3 = result;
  }

  cargarOS() {

    const obrasSociales = [];

    this._os.cargarOS(0, 0)
    .subscribe( (resp: any) => {

      for (const item of resp.os) {
        obrasSociales.push(item.nombre);
      }
      this.oss = obrasSociales;
    });
  }
}
