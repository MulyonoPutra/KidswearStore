import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/user.constant';

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        isLoading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.payload,
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

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        isLoading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        isLoading: false,
        user: action.payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        isLoading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
