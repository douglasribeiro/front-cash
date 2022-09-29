import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guards';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'fornecedor', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule)},
    {path: 'contas', loadChildren: () => import('./contas/contas.module').then(m => m.ContasModule)}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
