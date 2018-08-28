import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProfile from './profile.reducer';

export interface State {
  profile: fromProfile.State;
}

export const reducers: ActionReducerMap<State> = {
  profile: fromProfile.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
