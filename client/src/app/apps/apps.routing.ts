import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IsLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [IsLoggedGuard],
    children: [
      {
        path: 'classes',
        loadChildren: './classes/classes.routing#ClassesRoutingModule',
      },
      {
        path: 'tools',
        loadChildren: './tools/tools.module#ToolsModule',
      },
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
