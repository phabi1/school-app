import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TrombinoscopeComponent } from './containers/trombinoscope/trombinoscope.component';
import { TrombinoscopeEffects } from './effects/trombinoscope.effects';
import * as fromTrombinoscope from './reducers/trombinoscope.reducer';
import { TrombinoscopeService } from './services/trombinoscope.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('trombinoscope', fromTrombinoscope.reducer),
    EffectsModule.forFeature([TrombinoscopeEffects])
  ],
  declarations: [TrombinoscopeComponent],
  providers: [
    TrombinoscopeService
  ]
})
export class TrombinoscopeModule { }
