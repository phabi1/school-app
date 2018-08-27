import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SigninComponent } from './containers/signin/signin.component';
import { SigninEffects } from './effects/signin.effects';
import * as fromSignin from './reducers/signin.reducer';
import { SigninRoutingModule } from './signin.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SigninRoutingModule,
    FlexLayoutModule,
    StoreModule.forFeature('signin', fromSignin.reducer),
    EffectsModule.forFeature([SigninEffects]),
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
