import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { FormComponent } from './containers/form/form.component';
import { MonthPyramidService } from './services/month-pyramid.service';
import { MonthPyramidRoutingModule } from './month-pyramid.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MonthPyramidRoutingModule
  ],
  declarations: [FormComponent],
  providers: [
    MonthPyramidService
  ]
})
export class MonthPyramidModule { }
