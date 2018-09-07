import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { FormComponent } from './containers/form/form.component';
import { EvaluateGridRoutingModule } from './evaluate-grid.routing';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    EvaluateGridRoutingModule
  ],
  declarations: [FormComponent]
})
export class EvaluateGridModule { }
