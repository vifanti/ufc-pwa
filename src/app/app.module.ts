import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { PageHeaderModule } from './shared/modules/page-header/page-header.module';

import { AuthGuard } from './shared';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { VerificaCategoriaComponent } from './verifica-categoria/verifica-categoria.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DesenvolvedoresComponent } from './desenvolvedores/desenvolvedores.component';
import { HistoriaUfcComponent } from './historia-ufc/historia-ufc.component';
import { LutadorDetalheComponent } from './lutador-detalhe/lutador-detalhe.component';
import { LutadorEditarComponent } from './lutador-editar/lutador-editar.component';
import { LutadorNovoComponent } from './lutador-novo/lutador-novo.component';
import { LutadoresComponent } from './lutadores/lutadores.component';
import { PesquisaAleatoriaComponent } from './pesquisa-aleatoria/pesquisa-aleatoria.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CustomHttpInterceptor } from './shared/services/custom-http-interceptor.service';
import { UsersDetalheComponent } from './users-detalhe/users-detalhe.component';

export function tokenGetter() {
    return localStorage.getItem('access_token');
  }
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        PageHeaderModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
      AppComponent,
      SidebarComponent,
      HeaderComponent,
      VerificaCategoriaComponent,
      HomeComponent,
      LoginComponent,
      DesenvolvedoresComponent,
      HistoriaUfcComponent,
      LutadorDetalheComponent,
      LutadorEditarComponent,
      LutadorNovoComponent,
      LutadoresComponent,
      PesquisaAleatoriaComponent,
      SignupComponent,
      UsersComponent,
      UsersDetalheComponent
    ],
    providers: [AuthGuard,
      {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
