import {setLogOut} from '../../reducers/auth/auth-slice';
// import {IState} from '../../reducers';
import {isRejectedWithValue, Middleware} from '@reduxjs/toolkit';
import {authApi} from '../../services/auth/authApi';
import store from '../store';
import {showErrorMsg} from '../../utils/error-utils';
import {resetStateAction} from '../actions/resetState';

export const unauthenticatedMiddleware: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      if (
        action.meta.arg.endpointName !== 'refreshToken' &&
        action.payload.status === 403
      ) {
        const refreshToken = (store.getState()).auth.user
          ?.refreshToken;
        dispatch(
          // @ts-ignore
          authApi.endpoints.refreshToken.initiate({
            refreshToken: refreshToken,
          }),
        );
      } else if (action.payload.status === 403) {
        dispatch(setLogOut());
      } else if (action.payload.status === 401) {
        showErrorMsg(action.payload.data.error);
        dispatch(resetStateAction());
      } else if (action.payload.status === 403) {
        showErrorMsg(action.payload.data.error ?? action.payload.data.message);
      } else if (action.payload.status === 404) {
        showErrorMsg(action.payload.data.error ?? action.payload.data.message);
      } else {
        showErrorMsg(action.payload.data.error ?? action.payload.data.message);
      }
    }
    return next(action);
  };
