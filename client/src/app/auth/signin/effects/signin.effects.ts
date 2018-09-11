import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { SigninActionTypes, SigninSuccess, Signin, SigninFailure } from '../actions/signin.actions';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Authenticated } from 'ngrx-auth-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Notify } from '../../../store/actions/notify.actions';

@Injectable()
export class SigninEffects {

  @Effect()
  signin$ = this.actions$.pipe(
    ofType(SigninActionTypes.Signin),
    switchMap((action: Signin) => this.authenticationService.signin({
      email: action.payload.credentials.email,
      password: action.payload.credentials.password,
    }).pipe(
      map((res) => {
        if (res.valid) {
          this.store.dispatch(new Authenticated({
            token: res.token,
            refreshToken: res.refreshToken,
            identity: res.identity
          }));
          return new SigninSuccess();
        } else {
          return new SigninFailure({ error: null });
        }
      }),
      catchError((err) => of(new SigninFailure({ error: err })))
    )),
  );

  @Effect()
  signinFailure$ = this.actions$.pipe(
    ofType(SigninActionTypes.SigninFailure),
    map((err) => {
      return new Notify({ message: this._translateService.instant('signin.messages.invalidCredentials') });
    })
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private store: Store<any>,
    private _translateService: TranslateService,
  ) { }
}
