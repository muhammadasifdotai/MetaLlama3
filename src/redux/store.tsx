// yaha pr hum redux store ko setup krain gay.
// PURGE: Yai pura data jo store may hay usay app remove kr rhay ho.

import {configureStore} from '@reduxjs/toolkit'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    persistReducer,
    persistStore,
    REGISTER
} from 'redux-persist'
import reduxStorage from './storage'
import rootReducer from './rootReducer'

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    blackList: [], // is ka matlab hay kay iger ap nay ap close ki to data remove ho jayee ga.
    whiteList: ['chat'] // is ka matlab hay kay iger ap nay ap close ki to data baki rhay ga.
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
            }
        })
})

export const persistor = persistStore(store)