import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: ':id',
    children: [
      { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'edit', loadChildren: './modules/edit/edit.module#EditModule' },
      { path: 'students', loadChildren: './modules/students/students.module#StudentsModule' }
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule {}
