import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    createMigrate,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { reduxStorage } from '@utils/storage';
import { emptySplitApi } from '@services/emptySplitApi';
import reducers from '../reducers';
const migrations = {};

const persistConfig = {
    key: 'root',
    version: 1,
    storage: reduxStorage,
    blacklist: [],
    migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    // @ts-ignore
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat([emptySplitApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const persistor = persistStore(store);
export { persistor };

export default store;
