import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CrudScreen from '../screens/CrudScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreens"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="HomeScreens" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="CrudScreen" 
        component={CrudScreen}
        options={{ title: 'User' }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;