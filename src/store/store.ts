import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../services/UserService";
import { paperAPI } from "../services/PaperService";
import logger from 'redux-logger';

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [paperAPI.reducerPath]: paperAPI.reducer
});

export const setupStore = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ serializableCheck: false })
                .concat(userAPI.middleware)
                .concat(paperAPI.middleware)
                .concat(isDevelopment ? logger : [])
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
