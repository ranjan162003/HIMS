import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import MainContext from './mainscreens/Context/issueCreationContext'
import LoginScreen from './mainscreens/LoginScreen';
import HomeScreen from './mainscreens/Student/user-HomeScreen';
import ElectricalScreen from './mainscreens/Student/ElectricalSection';
import CarpenterScreen from './mainscreens/Student/CarpenterSection';
import OtherSectionScreen from './mainscreens/Student/OtherSection';
import RequestSectionScreen from './mainscreens/Student/RequestSection';
import WifiScreen from './mainscreens/Student/WifiSection';
import AdminHome from './mainscreens/Admin/admin-HomeScreen';
import Sidebar from './mainscreens/Sidebar';
import StatusScreen from './mainscreens/Student/StatusScreen'
import ProfilePage from './mainscreens/Student/ProfileScreen'
import SuggestionViewPage from './mainscreens/Admin/RequestViewSection'
import ViewComplaint from './mainscreens/Admin/ViewComplaints'
import UserUpdation from './mainscreens/Admin/Updation_user';
import CreateUserPage from './mainscreens/Admin/Create_user'
import DeleteUserPage from './mainscreens/Admin/Delete_user'

const Stack = createStackNavigator();

const App = () => {
return (
<MainContext>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerLeft: null,
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
        <Stack.Screen name="DeleteUserPage" component={DeleteUserPage}/>
        <Stack.Screen name="UserUpdation" component={UserUpdation}/>
        <Stack.Screen name="SuggestionPage" component={SuggestionViewPage}/>
        <Stack.Screen name="StatusScreen" component={StatusScreen}/>
        <Stack.Screen name="ViewComplaint" component={ViewComplaint}/>
        <Stack.Screen name="CreateUserPage" component={CreateUserPage}/>
        <Stack.Screen name="AdminHome" component={AdminHome}
        options={({ navigation }) => ({
          // title: 'Home',
          headerLeft: null,})}/>
        <Stack.Screen
          name="Electrical"
          component={ElectricalScreen}
          options={{ title: 'Electrical Related Complaints' }}
        />
        <Stack.Screen
          name="Carpenter"
          component={CarpenterScreen}
          options={{ title: 'Carpenter Related Complaints' }}
        />
        <Stack.Screen name="OtherSectionScreen" component={OtherSectionScreen}/>
        <Stack.Screen name="RequestSectionScreen" component={RequestSectionScreen} />
        <Stack.Screen name="Wifi" component={WifiScreen} />
        <Stack.Screen name="Profile" component={ProfilePage} />
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
  </MainContext>
);
};

export default App;
