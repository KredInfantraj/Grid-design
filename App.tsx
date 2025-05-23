
import React from 'react';


import { Text, View } from 'react-native';
import HomeScreens from './src/screens/HomeScreen';
import UserScreen from './src/screens/CrudScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const App = () => {
  return (
 <View style={{ flex: 1 }}>
      {/* <HomeScreens/> */}
      <UserScreen/>
    </View>
  );
};

export default App;