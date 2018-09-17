import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { BlocsModule } from '../../../ui/blocs/blocs.module';
import { EditComponent } from './containers/edit/edit.component';
import { GradesComponent } from './containers/grades/grades.component';
import { EditRoutingModule } from './edit.routing';
import { GradesEffects } from './effects/grades.effects';
import * as fromStore from './reducers';
import { GradesService } from './services/grades.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    BlocsModule,
    EditRoutingModule,
    StoreModule.forFeature('classesEdit', fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature([GradesEffects]),
  ],
  declarations: [EditComponent, GradesComponent],
  providers: [
    GradesService
  ]
})
export class EditModule { }
