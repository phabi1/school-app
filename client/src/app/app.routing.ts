import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'apps',
    loadChildren: './apps/apps.routing#AppsRoutingModule',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.routing#AuthRoutingModule',
  },
  {
    path: 'generators',
    loadChildren: './generators/generators.routing#GeneratorRoutingModule',
  },
  {
    path: '404',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
