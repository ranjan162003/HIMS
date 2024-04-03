import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './mainscreens/LoginScreen';
import HomeScreen from './mainscreens/user-HomeScreen';
import ElectricalScreen from './mainscreens/ElectricalSection';
import CarpenterScreen from './mainscreens/CarpenterSection';
import OtherSectionScreen from './mainscreens/OtherSection';
import RequestSectionScreen from './mainscreens/RequestSection';
import WifiScreen from './mainscreens/WifiSection';
import AdminHome from './mainscreens/admin-HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="ElectricalScreen" component={ElectricalScreen} options={{ title: 'Electrical Related Complaints' }}/>
        <Stack.Screen name="CarpenterScreen" component={CarpenterScreen} options={{ title: 'Carpenter Related Complaints' }}/>
        <Stack.Screen name="OtherSectionScreen" component={OtherSectionScreen}/>
        <Stack.Screen name="RequestSectionScreen" component={RequestSectionScreen}/>
        <Stack.Screen name="WifiScreen" component={WifiScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
