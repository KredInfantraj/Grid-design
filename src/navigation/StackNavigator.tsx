import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import CrudScreen from '../screens/CrudScreen';
import TicketScreen from '../screens/TicketScreen';
import EventBookingForm from '../screens/EventBookingForm';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreens"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="HomeScreens" 
        component={HomeScreen}
        
      />
      <Stack.Screen 
        name="CrudScreen" 
        component={CrudScreen}
       
      />
      <Stack.Screen 
        name="Ticket" 
        component={TicketScreen} 
        // options={{ title: 'Ticket' }}
      />
       <Stack.Screen 
        name="Bookingform" 
        component={EventBookingForm} 
      
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;