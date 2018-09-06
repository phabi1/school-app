import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './containers/form/form.component';
import { FirstnameLabelRoutingModule } from './firstname-label.routing';
import { MatButtonModule, MatSelectModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { FirstnameLabelService } from './services/firstname-label.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    FirstnameLabelRoutingModule
  ],
  declarations: [FormComponent],
  providers: [
    FirstnameLabelService
  ]
})
export class FirstnameLabelModule { }
