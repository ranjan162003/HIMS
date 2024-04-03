import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';

import LoginScreen from './mainscreens/LoginScreen';
import HomeScreen from './mainscreens/user-HomeScreen';
import ElectricalScreen from './mainscreens/ElectricalSection';
import CarpenterScreen from './mainscreens/CarpenterSection';
import OtherSectionScreen from './mainscreens/OtherSection';
import RequestSectionScreen from './mainscreens/RequestSection';
import WifiScreen from './mainscreens/WifiSection';
import AdminHome from './mainscreens/admin-HomeScreen';
import Sidebar from './mainscreens/Sidebar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Entypo
                name="menu"
                size={30}
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Sidebar')}
              />
            ),
          })}
        />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen
          name="ElectricalScreen"
          component={ElectricalScreen}
          options={{ title: 'Electrical Related Complaints' }}
        />
        <Stack.Screen
          name="CarpenterScreen"
          component={CarpenterScreen}
          options={{ title: 'Carpenter Related Complaints' }}
        />
        <Stack.Screen name="OtherSectionScreen" component={OtherSectionScreen}
         />
        <Stack.Screen name="RequestSectionScreen" component={RequestSectionScreen} />
        <Stack.Screen name="WifiScreen" component={WifiScreen} />
        <Stack.Screen
          name="Sidebar"
          component={Sidebar}
          options={{
            title: 'Sidebar',
            presentation: 'modal', // Use modal presentation
            headerShown: false, // Hide header for modal
            cardStyle: { backgroundColor: 'transparent' }, // Set background color to transparent
            cardOverlayEnabled: true, // Enable overlay for modal
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0.9], // Set overlay opacity
                  extrapolate: 'clamp',
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1], // Set overlay opacity
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
