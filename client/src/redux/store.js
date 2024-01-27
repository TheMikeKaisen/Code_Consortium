import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"

import themeReducer from './theme/themeSlice.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
})
 
const persistConfig = {
    key: 'root',
    storage,
  }


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)