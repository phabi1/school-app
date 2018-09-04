import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SetCurrentClass } from '../../store/actions/class.actions';

@Injectable({
  providedIn: 'root'
})
export class ClassGuard implements CanActivate {

  constructor(
    private _store: Store<any>,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this._store.dispatch(new SetCurrentClass({ id: '5b83ee62ea40ef20c04183c2' }));

    return of(true);
  }
}
