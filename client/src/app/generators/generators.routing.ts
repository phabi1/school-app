import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'calendar-month', loadChildren: './modules/calendar-month/calendar-month.module#CalendarMonthModule' },
  { path: 'firstname-label', loadChildren: './modules/firstname-label/firstname-label.module#FirstnameLabelModule' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule {}
