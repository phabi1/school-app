import { Action } from '@ngrx/store';
import { ProfileActions, ProfileActionTypes } from '../actions/profile.actions';

export interface State {
  refreshing: boolean;
  data: any;
}

export const initialState: State = {
  refreshing: false,
  data: null,
};

export function reducer(state = initialState, action: ProfileActions): State {
  switch (action.type) {

    case ProfileActionTypes.Refresh:
      return {...state, refreshing: true};
    case ProfileActionTypes.Refreshed:
      return {...state, refreshing: false, data: action.payload.data};


    default:
      return state;
  }
}
