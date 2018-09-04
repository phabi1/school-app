import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProfile from './profile.reducer';
import * as fromClass from './class.reducer';

export interface State {
  profile: fromProfile.State;  class: fromClass.State;

}

export const reducers: ActionReducerMap<State> = {
  profile: fromProfile.reducer,
  class: fromClass.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
