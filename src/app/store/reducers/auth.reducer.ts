import { User } from 'src/app/auth/payload/user.model';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

// same as auth service - user behavior subject
const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null // set the user to null on logout
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    default:
      // always have a default state returned !!!
      return state; // important for initializing the state (initial action to all reducers is sent at the start)
  }
}
