import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { LoadGrades } from '../actions/grade.actions';
import { LoadLayouts } from '../actions/layout.actions';
import { LoadStudents, SetSelectedStudents } from '../actions/student.actions';
import { getLoaded as getLayoutLoaded } from '../selectors/layout.selectors';
import { getLoaded as getStudentLoaded } from '../selectors/student.selectors';

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
      this.getStudents(),
      this.getGrades(),
    ).pipe(
      filter(([layoutLoaded, studentLoaded, gradeLoaded]) => !!(layoutLoaded && studentLoaded && gradeLoaded)),
      first(),
      tap(() => {
        let ids = [];
        if (next.queryParams.s) {
          ids = next.queryParams.s.split('s');
        }
        this._store.dispatch(new SetSelectedStudents({ ids }));
      }),
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

  protected getGrades(): Observable<boolean> {
    return this._store.pipe(
      select(getStudentLoaded),
      filter((loaded) => {
        if (!loaded) {
          this._store.dispatch(new LoadGrades());
        }
        return loaded;
      }),
      first()
    );
  }
}


