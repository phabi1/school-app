import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarMonthComponent } from './calendar-month.component';

const routes: Routes = [
  { path: '', component: CalendarMonthComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarMonthRoutingModule {}
