import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

//import { PersistGate } from "redux-persist/lib/integration/react";

// import the two exports from the last code snippet.
//import { persistor, store } from "./store";
import { store } from "./store";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


import indexRoutes from "routes/index.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.1.0";

import { AUTH_USER } from "./actions/types";

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const token = localStorage.getItem("token");
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

//window.theStore = store;

const hist = createBrowserHistory();
// <PersistGate loading={null} persistor={persistor}>
//  </PersistGate>
//
ReactDOM.render(
  <Provider store={store}>

      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} component={prop.component} key={key} />
            );
          })}
        </Switch>
      </Router>

  </Provider>,
  document.getElementById("root")
);
