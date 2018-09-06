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
      { path: 'students', loadChildren: './students/students.module#StudentsModule' },
      {
        path: 'tools',
        loadChildren: './tools/tools.module#ToolsModule',
      },
      {
        path: 'generators',
        loadChildren: './generators/generators.routing#GeneratorRoutingModule',
    },
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule {}
