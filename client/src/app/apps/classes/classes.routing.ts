import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassSelectGuard } from '../../core/guards/class-select.guard';

const routes: Routes = [
  {
    path: ':classId',
    canActivate: [ClassSelectGuard],
    children: [
      { path: 'edit', loadChildren: './edit/edit.module#EditModule' },
      { path: 'students', loadChildren: './students/students.module#StudentsModule' }
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule {}
