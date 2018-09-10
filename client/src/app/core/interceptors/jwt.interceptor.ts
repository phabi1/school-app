import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getToken } from 'ngrx-auth-store';

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
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const clone = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return clone;
  }
}
