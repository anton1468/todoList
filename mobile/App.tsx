import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from 'react-native-toast-notifications';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleSheet, View } from 'react-native';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';

export default function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <ToastProvider placement="top"
      duration={2500}
      animationType='zoom-in'
      animationDuration={300}
      textStyle={{ fontSize: 18 }}
      offsetTop={40}
      offsetBottom={40}
      swipeEnabled={true}
    >
      <AuthContext.Provider value={
        { token, login, logout, userId, isAuthenticated }
      }>
        <Router>
          {isAuthenticated && <Navbar/>}
          <View style={styles.container}>
            {routes}
            <StatusBar style="auto" />
          </View>
        </Router>
      </AuthContext.Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
