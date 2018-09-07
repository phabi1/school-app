import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { AttendanceGridRoutingModule } from './attendance-grid.routing';
import { FormComponent } from './containers/form/form.component';
import { AttendanceGridService } from './services/attendance-grid.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    AttendanceGridRoutingModule
  ],
  declarations: [FormComponent],
  providers: [
    AttendanceGridService
  ]
})
export class AttendanceGridModule { }
