import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
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
