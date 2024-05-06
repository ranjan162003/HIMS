import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo vector icons library
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for carpenter icon
import moment from 'moment'; // Import moment library for date formatting
import {useNavigation} from '@react-navigation/native'
const AdminHome = () => {
  const todayDate = moment().format('MMMM D, YYYY'); // Format today's date

  // Function to handle button press and navigate to another screen
  const navigation = useNavigation();
  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName); // Navigate to the specified screen
  };

  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Welcome message */}
      <Text style={styles.welcomeText}>Welcome</Text>

      {/* Username */}
      <Text style={styles.usernameText}>Admin</Text>

      {/* Today's date */}
      <Text style={styles.dateText}>{todayDate}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Button  View Complaint Section */}
        <TouchableOpacity style={styles.button} onPress={()=> handleButtonPress('ViewComplaint')}>
          <MaterialIcons name="view-module" size={30} color="black" />
          <Text style={styles.buttonText}>View Complaints</Text>
        </TouchableOpacity>

        {/* Button USer CRUD Section */}
        <TouchableOpacity style={styles.button} onPress={()=> handleButtonPress('UserUpdation')}>
        <MaterialIcons name="create" size={30} color="black" />
          <Text style={styles.buttonText}>Create/update/delete user</Text>
        </TouchableOpacity>

        {/* Button Wifi Section */}
        <TouchableOpacity style={styles.button} onPress={()=> handleButtonPress('WifiScreen')}>
          <FontAwesome name="wifi" size={30} color="black" />
          <Text style={styles.buttonText}>create/delete compalint</Text>
        </TouchableOpacity>

        {/* Button Other Section */}
        <TouchableOpacity style={styles.button} onPress={()=> handleButtonPress('OtherSectionScreen')}>
          <FontAwesome name="plus" size={30} color="black" />
          <Text style={styles.buttonText}>Others</Text>
        </TouchableOpacity>

        {/* Button Request Section */}
        <TouchableOpacity style={styles.buttonforrequest} onPress={()=> handleButtonPress('RequestSectionScreen')}>
        <FontAwesome name="commenting" size={30} color="black" />
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 35,
    marginBottom: 1,
    color:'brown',
  },
  usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'brown',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 35,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // marginTop:150
  },
  button: {
    width: '48%', // Adjust button width as needed
    height: '100%',
    aspectRatio: 7/7.5, // Maintain aspect ratio for square buttons
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
 
  },
  buttornText: {
    fontSize: 16, // Adjust font size as needed
    marginTop: 5,
    textAlign: 'center', // Center align text
  },
  buttonforrequest:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width:'100%',
    borderRadius: 10,
    marginBottom: 10,
    height: '15%',
  
  }
});

export default AdminHome;
