import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileActionTypes, Refresh, Refreshed } from '../actions/profile.actions';
import { AuthActionTypes, Identity, getIdentity } from 'ngrx-auth-store';
import { map, switchMap, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {

  @Effect()
  authenticated$: Observable<Refresh> = this.actions$.pipe(
    ofType(AuthActionTypes.Authenticated),
    map(() => new Refresh())
  );

  @Effect()
  refresh$: Observable<Refreshed> = this.actions$.pipe(
    ofType(ProfileActionTypes.Refresh),
    switchMap(() => this.getIdentity().pipe(
      switchMap((identity: Identity) => {
        if (identity) {
          return this._profileService.getProfile();
        } else {
          return of(null);
        }
      }),
    )),
    map((data) => new Refreshed({ data }))
  );

  constructor(
    private actions$: Actions,
    private _profileService: ProfileService,
    private _store: Store<any>
  ) { }

  private getIdentity(): Observable<Identity> {
    return this._store.pipe(
      select(getIdentity),
      first()
    );
  }
}
