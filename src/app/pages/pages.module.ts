import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './table/table.component';
import { ChartsModule } from 'ng2-charts';
import { NgxTypeaheadModule } from 'ngx-typeahead';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ServiceModule } from '../services/service.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { OsComponent } from './os/os.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { PacienteNuevoComponent } from './paciente-nuevo/paciente-nuevo.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PacienteComponent } from './pacientes/paciente.component';

@NgModule({
    declarations: [
        ModalUploadComponent,
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component,
        TableComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        OsComponent,
        MedicosComponent,
        MedicoComponent,
        PacienteNuevoComponent,
        PacientesComponent,
        TurnosComponent,
        PacienteComponent],
        exports: [
            DashboardComponent,
            ProgressComponent,
            PagesComponent,
            Graficas1Component
        ],
        imports: [
            CommonModule,
            SharedModule,
            PAGES_ROUTES,
            FormsModule,
            ChartsModule,
            BrowserModule,
            ServiceModule,
            PipesModule,
            NgxTypeaheadModule
        ]
})

export class PagesModule {}

