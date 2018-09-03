import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from 'ngrx-auth-store';
import { environment } from '../../environments/environment';
import { ProfileEffects } from './effects/profile.effects';
import { RouterEffects } from './effects/router.effects';
import * as fromStore from './reducers';
import * as fromProfile from './reducers/profile.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forRoot([]),
    AuthStoreModule.forRoot({
      signInUrl: '/auth/signin'
    }),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    StoreModule.forFeature('profile', fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects, RouterEffects]),
  ],
  declarations: []
})
export class AppStoreModule { }
