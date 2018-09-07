import { Action } from '@ngrx/store';


export interface State {
  generating: boolean;
}

export const initialState: State = {
  generating: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
