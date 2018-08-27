import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './containers/form/form.component';
import { FirstnameLabelRoutingModule } from './firstname-label.routing';
import { MatButtonModule } from '@angular/material';
import { FirstnameLabelService } from './services/firstname-label.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FirstnameLabelRoutingModule
  ],
  declarations: [FormComponent],
  providers: [
    FirstnameLabelService
  ]
})
export class FirstnameLabelModule { }
