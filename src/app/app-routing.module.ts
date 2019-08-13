import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
import { VerificaCategoriaComponent } from './verifica-categoria/verifica-categoria.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LutadoresComponent } from './lutadores/lutadores.component';
import { LutadorNovoComponent } from './lutador-novo/lutador-novo.component';
import { LutadorDetalheComponent } from './lutador-detalhe/lutador-detalhe.component';
import { LutadorEditarComponent } from './lutador-editar/lutador-editar.component';
import { PesquisaAleatoriaComponent } from './pesquisa-aleatoria/pesquisa-aleatoria.component';
import { SignupComponent } from './signup/signup.component';
import { HistoriaUfcComponent } from './historia-ufc/historia-ufc.component';
import { DesenvolvedoresComponent } from './desenvolvedores/desenvolvedores.component';
import { UsersComponent } from './users/users.component';
import { UsersDetalheComponent } from './users-detalhe/users-detalhe.component';
import { UsersNovoComponent } from './users-novo/users-novo.component';

const routes: Routes = [
    // canActivate: [AuthGuard]
    { path: '', redirectTo: 'home', pathMatch: 'prefix' },

    // { path: 'layout', loadChildren: './layout/layout.module#LayoutModule', },
    // { path: 'login', loadChildren: './login/login.module#LoginModule' },
    // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    // { path: '**', redirectTo: 'not-found' },

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'lutadores', component: LutadoresComponent, canActivate: [AuthGuard] },
    { path: 'lutador-novo', component: LutadorNovoComponent, canActivate: [AuthGuard] },
    { path: 'lutador-detalhe/:id', component: LutadorDetalheComponent, canActivate: [AuthGuard] },
    { path: 'lutador-editar/:id', component: LutadorEditarComponent, canActivate: [AuthGuard] },
    { path: 'pesquisa-aleatoria', component: PesquisaAleatoriaComponent, canActivate: [AuthGuard] },
    { path: 'verifica-categoria', component: VerificaCategoriaComponent },
    { path: 'historia-ufc', component: HistoriaUfcComponent },
    { path: 'desenvolvedores', component: DesenvolvedoresComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users-detalhe/:id', component: UsersDetalheComponent, canActivate: [AuthGuard] },
    { path: 'users-novo', component: UsersNovoComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
