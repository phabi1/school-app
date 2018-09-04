import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from 'ngrx-auth-store';
import { environment } from '../../environments/environment';
import { ClassEffects } from './effects/class.effects';
import { ProfileEffects } from './effects/profile.effects';
import { RouterEffects } from './effects/router.effects';
import * as fromStore from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forRoot([]),
    AuthStoreModule.forRoot({
      signInUrl: '/auth/signin'
    }),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    EffectsModule.forFeature([ProfileEffects, RouterEffects, ClassEffects]),
  ],
  declarations: []
})
export class AppStoreModule { }
