// src/store/index.js

import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger'

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers"; // the value from combineReducers

const loggerMiddleware = createLogger()

const middleware = [reduxThunk, loggerMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = composeEnhancers(
  applyMiddleware(...middleware),
)(createStore)

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ['socket']

};
const persistReducer2 = persistReducer(persistConfig, rootReducer);

export const store = configureStore(persistReducer2);
export const persistor = persistStore(store);
