import { User } from 'src/app/auth/payload/user.model';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

// Same as auth service - user behavior subject
const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
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
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null, // set the user to null on logout
      };
    case AuthActions.LOGIN_START: // handle both cases
    case AuthActions.SIGNUP_START: // handle both cases
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      // always have a default state returned !!!
      return state; // important for initializing the state (initial action to all reducers is sent at the start)
  }
}
