import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, take, tap, switchMap, filter } from 'rxjs/operators';
import { LoadStudents, SetCurrentStudent } from '../actions/student.actions';
import { getLoaded as getStudentsLoaded } from '../selectors/student.selectors';
import { getLoaded as getLevelsLoaded } from '../selectors/level.selectors';
import { LoadLevels } from '../actions/level.actions';

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
      filter(([levelsLoaded]) => !!levelsLoaded),
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
          this.store.dispatch(new LoadLevels());
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
