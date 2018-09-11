import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getToken } from 'ngrx-auth-store';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Signout } from '../../auth/signout/actions/signout.actions';
import { Go } from '../../store/actions/router.actions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private _token: string;

  constructor(private _store: Store<any>) {
    this._store.pipe(select(getToken)).subscribe((token) => this._token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this._token) {
      req = this.addToken(req, this._token);
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(err);

          }
          return Observable.throw(err);
        } else {
          return Observable.throw(err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const clone = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return clone;
  }

  private handle401Error(err: HttpErrorResponse): Observable<never> {
    return this.signout();
  }

  private signout(): Observable<never> {
    this._store.dispatch(new Go({ path: ['/signout'] }));
    return Observable.throw('');
  }
}
