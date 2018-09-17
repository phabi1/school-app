import { Action } from '@ngrx/store';
import { GroupsActions, GroupsActionTypes } from '../actions/groups.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: GroupsActions): State {
  switch (action.type) {

    case GroupsActionTypes.LoadGroupss:
      return state;


    default:
      return state;
  }
}
