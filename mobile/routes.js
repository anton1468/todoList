import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Switch, Route, Redirect } from 'react-router';
import LinksPage from './pages/LinksPage/LinksPage';
import CreatePage from './pages/CreatePage/CreatePage';
import AuthPage from './pages/AuthPage/AuthPage';

export const useRoutes = (isAuthenticated) => {
  const Stack = createNativeStackNavigator();
  if (isAuthenticated) {
    return (

      <Switch>
        <Route exact path="/links" >
          <LinksPage />
        </Route>
        <Route exact path="/create" >
          <CreatePage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
