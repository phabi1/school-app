import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromStore from './reducers';
import { AuthStoreModule } from 'ngrx-auth-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forRoot([]),
    AuthStoreModule.forRoot({
      signInUrl: '/auth/signin'
    }),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
  ],
  declarations: []
})
export class AppStoreModule { }
