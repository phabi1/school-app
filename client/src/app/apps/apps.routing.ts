import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from 'ngrx-auth-store';
import { ClassGuard } from '../core/guards/class.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsLoggedGuard, ClassGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'classes',
        loadChildren: './classes/classes.routing#ClassesRoutingModule',
      },
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
