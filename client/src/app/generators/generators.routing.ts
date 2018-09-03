import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'calendar-month', loadChildren: './modules/calendar-month/calendar-month.module#CalendarMonthModule' },
  { path: 'firstname-label', loadChildren: './modules/firstname-label/firstname-label.module#FirstnameLabelModule' },
  { path: 'evaluate-grid', loadChildren: './modules/evaluate-grid/evaluate-grid.module#EvaluateGridModule' },
  { path: 'attendance-grid', loadChildren: './modules/attendance-grid/attendance-grid.module#AttendanceGridModule' },
  { path: 'month-pyramid', loadChildren: './modules/month-pyramid/month-pyramid.module#MonthPyramidModule' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule {}
