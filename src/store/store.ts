import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI } from '../services/UserService';
import logger from 'redux-logger';
import { paperAPI } from '../services/PaperService';

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [paperAPI.reducerPath]: paperAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ serializableCheck: false })
        .concat(userAPI.middleware)
        .concat(paperAPI.middleware)
        .concat(logger)
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];