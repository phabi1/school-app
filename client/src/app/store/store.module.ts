import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, StoreRouterConfig } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from 'ngrx-auth-store';
import { environment } from '../../environments/environment';
import { ClassEffects } from './effects/class.effects';
import { ProfileEffects } from './effects/profile.effects';
import { RouterEffects } from './effects/router.effects';
import * as fromStore from './reducers';
import { CustomSerializer } from './utils/router';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    EffectsModule.forRoot([]),
    AuthStoreModule.forRoot({
      signInUrl: '/auth/signin'
    }),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    EffectsModule.forFeature([ProfileEffects, RouterEffects, ClassEffects]),
  ],
  declarations: [],
  providers: [
    CustomSerializer,
  ]
})
export class AppStoreModule { }
