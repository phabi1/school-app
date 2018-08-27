import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'classes',
    loadChildren: './classes/classes.routing#ClassesRoutingModule',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.routing#AuthRoutingModule'
  },
  {
    path: 'generators',
    loadChildren: './generators/generators.routing#GeneratorRoutingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
