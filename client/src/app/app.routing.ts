import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/apps',
    pathMatch: 'full',
  },
  {
    path: 'apps',
    loadChildren: './apps/apps.routing#AppsRoutingModule',
  },
  {
    path: 'signin',
    loadChildren: './auth/signin/signin.module#SigninModule',
  },
  {
    path: 'signout',
    loadChildren: './auth/signout/signout.module#SignoutModule',
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
