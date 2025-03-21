import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <>
      {/* Status bar for consistent appearance across devices */}
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
      <AppNavigator />
    </>
  );
};

export default App;
