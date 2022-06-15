import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT_REQUEST,
} from './../../constants/user.constant';

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        isLoading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        isLoading: false,
        user: action.payload,
      };
    case USER_SIGNIN_FAILURE:
      return {
        isLoading: false,
        error: action.payload,
      };
    case USER_SIGNOUT_REQUEST:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};
