import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { LoadStudentsSuccess, StudentActionTypes } from '../actions/student.actions';
import { FirstnameLabelService } from '../services/firstname-label.service';
import { Store, select } from '@ngrx/store';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';


@Injectable()
export class StudentEffects {

  private _currentClassId: string;

  @Effect()
  load$ = this.actions$.pipe(
    ofType(StudentActionTypes.LoadStudents),
    switchMap(() => this._firstnameLabelService.getStudents(this._currentClassId)),
    map((students) => new LoadStudentsSuccess({ students }))
  );

  constructor(
    private actions$: Actions,
    private _firstnameLabelService: FirstnameLabelService,
    private _store: Store<any>
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }
}
