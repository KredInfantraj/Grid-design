
import React from 'react';
import { NavigationContainer, ThemeContext } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/Provider/ThemeProvider';



const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </ThemeProvider>

  );
};

export default App;