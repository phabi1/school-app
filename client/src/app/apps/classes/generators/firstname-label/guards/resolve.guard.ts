import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, first, map } from 'rxjs/operators';
import { getLoaded as getLayoutLoaded } from '../selectors/layout.selectors';
import { getLoaded as getStudentLoaded } from '../selectors/student.selectors';
import { LoadLayouts } from '../actions/layout.actions';
import { LoadStudents } from '../actions/student.actions';

@Injectable()
export class ResolveGuard implements CanActivate {

  constructor(
    private _store: Store<any>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return forkJoin(
      this.getLayout(),
      this.getStudents()
    ).pipe(
      filter(([layoutLoaded, studentLoaded]) => !!(layoutLoaded && studentLoaded)),
      first(),
      map(() => true)
    );
  }

  protected getLayout(): Observable<boolean> {
    return this._store.pipe(
      select(getLayoutLoaded),
      filter((loaded) => {
        if (!loaded) {
          this._store.dispatch(new LoadLayouts());
        }
        return loaded;
      }),
      first()
    );
  }

  protected getStudents(): Observable<boolean> {
    return this._store.pipe(
      select(getStudentLoaded),
      filter((loaded) => {
        if (!loaded) {
          this._store.dispatch(new LoadStudents());
        }
        return loaded;
      }),
      first()
    );
  }
}
