import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProfile from './profile.reducer';
import * as fromClass from './class.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../utils/router';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  profile: fromProfile.State;
  class: fromClass.State;

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  profile: fromProfile.reducer,
  class: fromClass.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
