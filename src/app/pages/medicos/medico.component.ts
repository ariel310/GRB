import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('', '');

  constructor(public _medico: MedicoService,
    public _hospital: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService) {
      activatedRoute.params.subscribe( params => {
        const id = params['id'];

        if ( id !== 'nuevo' ) {
          this.cargarMedico( id );
        }
      });
    }

  ngOnInit() {
        this._hospital.cargarHospitales(0, 0)
        .subscribe( (resp: any) => this.hospitales = resp.hospitales );

        this._modalUpload.notification
          .subscribe( resp => {
              this.medico.img = resp.medicos.img;
          });
  }

  cargarMedico( id: string ) {

    this._medico.cargarMedico( id )
    .subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    });
  }

  guardarMedico( f: NgForm ) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medico.guardarMedico( this.medico )
    .subscribe( (medico: any ) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id ]);
    });
  }

  cambioHospital( id: string ) {

    if ( id.length === 0 ) {
      return;
    }

    this._hospital.obtenerHospital( id )
    .subscribe( hospital => {
      console.log(hospital);
      this.hospital = hospital;
    });
  }

  cambiarFoto() {

    this._modalUpload.mostrarModal( 'medicos', this.medico._id, this.medico.img );

  }
}
