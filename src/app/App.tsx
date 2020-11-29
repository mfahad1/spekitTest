import React from 'react';

import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import FavouriteList from './favourite-list/favouriteList';
import List from './list/list';
import SessionContextProvider from './shared/session';

function App(): JSX.Element {
  return (
    <SessionContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route exact path="/favourite">
            <FavouriteList />
          </Route>
        </Switch>
      </Router>
    </SessionContextProvider>
  );
}

export default App;
