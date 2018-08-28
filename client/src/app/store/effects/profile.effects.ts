import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileActionTypes, Refresh, Refreshed } from '../actions/profile.actions';
import { AuthActionTypes, Identity, getIdentity } from 'ngrx-auth-store';
import { map, switchMap, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

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
        let data: any = null;
        if (identity) {
          data = { uid: 1, names: { firstname: 'Coralie', lastname: 'Heilles' }, email: 'cocodile77@live.fr' };
        }
        return of(new Refreshed({ data }));
      })
    ))
  );

  constructor(
    private actions$: Actions,
    private _store: Store<any>
  ) { }

  private getIdentity(): Observable<Identity> {
    return this._store.pipe(
      select(getIdentity),
      first()
    );
  }
}
