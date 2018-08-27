import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { AuthenticationResult, AuthenticationService as IAuthenticationService, Identity } from 'ngrx-auth-store';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

interface SigninResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(): Observable<AuthenticationResult> {
    const token = localStorage.getItem('token');

    let identity: Identity;
    if (token) {
      identity = jwtDecode(token);
    }

    return of({ valid: true, token, identity });
  }

  signin(credentials: { email: string, password: string }): Observable<AuthenticationResult> {
    return this.http.post<SigninResponse>('/api/auth/signin', credentials).pipe(
      map((res) => {
        const token = res.token;

        localStorage.setItem('token', token);

        const payload: any = jwtDecode(token);
        const identity = {
          uid: payload.id,
        };
        return { valid: true, token, identity };
      }),
      catchError((err) => {
        throw new Error('');
      })
    );
  }

  refresh(refreshToken?: string): Observable<AuthenticationResult> {
    throw new Error('Method not implemented.');
  }
}
