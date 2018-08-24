import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CalendarMonthComponent } from './calendar-month.component';
import { CalendarMonthRoutingModule } from './calendar-month.routing';
import { CalendarMonthService } from './calendar-month.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CalendarMonthRoutingModule
  ],
  declarations: [CalendarMonthComponent],
  providers: [
    CalendarMonthService
  ]
})
export class CalendarMonthModule { }
