import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignoutComponent } from './containers/signout/signout.component';
import { SignoutRoutingModule } from './signout.routing';
import { StoreModule } from '@ngrx/store';
import * as fromSignout from './reducers/signout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SignoutEffects } from './effects/signout.effects';

@NgModule({
  imports: [
    CommonModule,
    SignoutRoutingModule,
    StoreModule.forFeature('signout', fromSignout.reducer),
    EffectsModule.forFeature([SignoutEffects])
  ],
  declarations: [SignoutComponent]
})
export class SignoutModule { }
