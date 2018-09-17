import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GroupsActionTypes } from '../actions/groups.actions';

@Injectable()
export class GroupsEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(GroupsActionTypes.LoadGroupss));

  constructor(private actions$: Actions) {}
}
