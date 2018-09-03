import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { LevelActionTypes, LoadLevelsFailure, LoadLevelsSuccess } from '../actions/level.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { StudentsService } from '../services/students.service';


@Injectable()
export class LevelEffects {

  private classId: string;

  @Effect()
  load$: Observable<LoadLevelsSuccess | LoadLevelsFailure> = this.actions$.pipe(
    ofType(LevelActionTypes.LoadLevels),
    switchMap(() => this._studentsService.getLevels(this.classId)),
    map((levels) => new LoadLevelsSuccess({ levels })),
    catchError((err) => of(new LoadLevelsFailure({ error: err })))
  );

  constructor(
    private actions$: Actions,
    private _studentsService: StudentsService
  ) {
    this.classId = '5b83ee62ea40ef20c04183c2';
  }
}
