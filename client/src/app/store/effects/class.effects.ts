import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ClassActionTypes } from '../actions/class.actions';

@Injectable()
export class ClassEffects {

  constructor(private actions$: Actions) {}
}
