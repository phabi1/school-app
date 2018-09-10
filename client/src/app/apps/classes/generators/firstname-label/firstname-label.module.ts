import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { FormComponent } from './containers/form/form.component';
import { FormEffects } from './effects/form.effects';
import { GradeEffects } from './effects/grade.effects';
import { LayoutEffects } from './effects/layout.effects';
import { StudentEffects } from './effects/student.effects';
import { FirstnameLabelRoutingModule } from './firstname-label.routing';
import { ResolveGuard } from './guards/resolve.guard';
import * as fromFirstnameLabel from './reducers';
import { FirstnameLabelService } from './services/firstname-label.service';

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
    MatChipsModule,
    TranslateModule,
    FirstnameLabelRoutingModule,
    StoreModule.forFeature('firstnameLabel', fromFirstnameLabel.reducers),
    EffectsModule.forFeature([FormEffects, LayoutEffects, StudentEffects, GradeEffects]),
  ],
  declarations: [FormComponent],
  providers: [
    ResolveGuard,
    FirstnameLabelService
  ]
})
export class FirstnameLabelModule { }
