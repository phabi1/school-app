import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'calendar-month', loadChildren: './calendar-month/calendar-month.module#CalendarMonthModule' },
  { path: 'firstname-label', loadChildren: './firstname-label/firstname-label.module#FirstnameLabelModule' },
  { path: 'evaluate-grid', loadChildren: './evaluate-grid/evaluate-grid.module#EvaluateGridModule' },
  { path: 'attendance-grid', loadChildren: './attendance-grid/attendance-grid.module#AttendanceGridModule' },
  { path: 'month-pyramid', loadChildren: './month-pyramid/month-pyramid.module#MonthPyramidModule' },
  { path: 'trombinoscope', loadChildren: './trombinoscope/trombinoscope.module#TrombinoscopeModule' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule {}
