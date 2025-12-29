import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth/authApi';
import { addOrUpdateUser } from '@helpers/firestore';
import { storage } from '@utils/storage';
import { IUserOrNull } from '@appTypes/type';

export interface AuthState {
  user?: IUserOrNull;
  options: IOptions;
}

export interface IOptions {
  loggedIn?: boolean;
  isGuest?: boolean;
  isChatActive?: boolean;
}

const initialState: AuthState = {
  user: {},
  options: {
    loggedIn: false,
    isGuest: true,
    isChatActive: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state: AuthState, { payload }: { payload: any }) => {
      state.user = { ...state.user, ...payload };
    },
    setAuthOptions: (state: AuthState, { payload }: { payload: IOptions }) => {
      state.options = { ...state.options, ...payload };
    },
    setLogIn: (state: AuthState, { payload }: { payload: any }) => {
      state.user = payload;
      state.options = {
        isGuest: false,
        loggedIn: true,
        isChatActive: payload.chatEnabled || false,
      };
      storage.set('isLoggedIn', 'true'); // <-- Set key to true
    },
    setLogOut: (state: AuthState) => {
      state.user = null;
      state.options = {
        isGuest: true,
        loggedIn: false,
      };
      storage.set('isLoggedIn', 'false'); // <-- Set key to false
      // AsyncStorage.removeItem('chatModalShown');
    },
    toggleChat: (state: AuthState, { payload }: { payload: boolean }) => {
      state.options.isChatActive = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state: AuthState, { payload }: { payload: any }) => {
        state.user = payload;
        state.options = {
          isGuest: false,
          loggedIn: true,
          isChatActive: false,
        };
        storage.set('isLoggedIn', 'true'); // <-- Also add here for login API
      }
    );
  },
});

export default authSlice.reducer;
export const { setAuthOptions, setAuthUser, setLogIn, setLogOut, toggleChat } =
  authSlice.actions;
