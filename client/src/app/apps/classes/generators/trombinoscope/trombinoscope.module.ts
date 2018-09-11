import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { TrombinoscopeComponent } from './containers/trombinoscope/trombinoscope.component';
import { TrombinoscopeEffects } from './effects/trombinoscope.effects';
import * as fromTrombinoscope from './reducers/trombinoscope.reducer';
import { TrombinoscopeService } from './services/trombinoscope.service';
import { TrombinoscopeRoutingModule } from './trombinoscope.routing';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MatButtonModule,
    StoreModule.forFeature('trombinoscope', fromTrombinoscope.reducer),
    EffectsModule.forFeature([TrombinoscopeEffects]),
    TrombinoscopeRoutingModule,
  ],
  declarations: [TrombinoscopeComponent],
  providers: [
    TrombinoscopeService
  ]
})
export class TrombinoscopeModule { }
