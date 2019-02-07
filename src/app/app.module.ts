import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import { APP_ROUTES } from './app.routes';
// Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ServiceModule } from './services/service.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ModalTurnosComponent } from './components/modal-turnos/modal-turnos.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterModalComponent,
    LoginModalComponent,
    ModalTurnosComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    PagesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
