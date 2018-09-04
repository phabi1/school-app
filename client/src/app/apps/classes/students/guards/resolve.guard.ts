import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadGrades } from '../actions/grade.actions';
import { LoadStudents, SetCurrentStudent } from '../actions/student.actions';
import { getLoaded as getLevelsLoaded } from '../selectors/grade.selectors';
import { getLoaded as getStudentsLoaded } from '../selectors/student.selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

  private routerState: ActivatedRouteSnapshot;

  constructor(
    private store: Store<any>,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.routerState = next;

    return this.checkStore().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<any> {
    return forkJoin(this.getLevels()).pipe(
      filter(([gradesLoaded]) => !!gradesLoaded),
      take(1),
      switchMap(() => this.getStudents()),
      take(1),
      tap(() => {
        this.store.dispatch(new SetCurrentStudent({ id: this.routerState.params.studentId }));
      }),
    );
  }

  private getLevels(): Observable<boolean> {
    return this.store.pipe(
      select(getLevelsLoaded),
      filter((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadGrades());
        }
        return loaded;
      }),
      take(1),
    );
  }

  private getStudents(): Observable<any> {
    return this.store.pipe(
      select(getStudentsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadStudents());
        }
      }),
      take(1),
    );
  }
}
