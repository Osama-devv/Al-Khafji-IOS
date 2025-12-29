// reducers/index.ts
import { combineReducers } from 'redux';
import { authSlice, AuthState } from './auth/auth-slice'; // Import your authReducer here
import { startupSlice, StartupState } from 'src/reducers/startup/startup-slice';
import { emptySplitApi } from '../services/emptySplitApi';
import {themeSlice}  from '../reducers/theme/theme-slice'
import { filterSlice } from './residence-filters/residence-filters-slice';
// Import other reducers if you have them

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    startup: startupSlice.reducer,
    theme: themeSlice.reducer,
    residenceFilters:filterSlice.reducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer, // Add your authReducer to the rootReducer
    // Add other reducers here if needed
});

export interface IState {
    auth: AuthState;
    startup: StartupState;
    residenceFilters:any
}

export default rootReducer;
