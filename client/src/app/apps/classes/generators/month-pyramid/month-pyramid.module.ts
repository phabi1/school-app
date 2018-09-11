import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { FormComponent } from './containers/form/form.component';
import { MonthPyramidService } from './services/month-pyramid.service';
import { MonthPyramidRoutingModule } from './month-pyramid.routing';
import { StoreModule } from '@ngrx/store';
import * as fromMonthPyramid from './reducers/month-pyramid.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MonthPyramidEffects } from './effects/month-pyramid.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MonthPyramidRoutingModule,
    StoreModule.forFeature('monthPyramid', fromMonthPyramid.reducer),
    EffectsModule.forFeature([MonthPyramidEffects])
  ],
  declarations: [FormComponent],
  providers: [
    MonthPyramidService
  ]
})
export class MonthPyramidModule { }
