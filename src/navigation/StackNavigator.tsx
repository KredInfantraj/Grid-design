import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import CrudScreen from '../screens/CrudScreen';
import TicketScreen from '../screens/TicketScreen';
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
        // options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="CrudScreen" 
        component={CrudScreen}
        // options={{ title: 'User' }}
      />
      <Stack.Screen 
        name="Ticket" 
        component={TicketScreen} 
        // options={{ title: 'Your Ticket' }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;