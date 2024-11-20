import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Login from './screens/Login';
import Settings from './screens/Settings';
import Calendar from './screens/Calendar';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, FontAwesome5, Feather  } from '@expo/vector-icons'
 import BarbersForm from './screens/BarberForm';
import ServicesForm from './screens/Services';
import Services from './screens/Services';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ name, size, color, focused }) => {
  // Apply custom styles to the tab bar icon here
  return (
    <View style={styles.tabIconContainer}>
      <FontAwesome5 name={name} size={size} color={color} />
      {focused && <View style={styles.tabIconOverlay} />}
    </View>
  );
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
        activeTintColor: 'black', // Color of the active tab
        inactiveTintColor: 'gray', // Color of the inactive tabs
        style: {
          backgroundColor: 'white', // Background color of the tab bar
        },
        labelStyle: {
          fontSize: 11, // Font size of the tab labels
          marginBottom: 5, // Spacing between the label and the icon
        },
        tabBarLabelStyle: {
          color: 'black', // Color of the tab names
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendário"
        component={Calendar}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="calendar-alt" size={24} color={color} />
          ),
        }}
      />
        { <Tab.Screen
          name="Barbeiros"
          component={BarbersForm}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="scissors" size={24} color={color} />
            ),
          }}
        /> }
         <Tab.Screen
        name="Serviços"
        component={Services}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="razor-single-edge" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Defenições"
        component={Settings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />

      
     
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name='Tabs'
        component={Tabs}
        options={{ headerShown: false }}


      />


      
    </Stack.Navigator>

  );
};


export default Routes;