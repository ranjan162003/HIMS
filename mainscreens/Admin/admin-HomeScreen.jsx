import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo vector icons library
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for carpenter icon
import moment from 'moment'; // Import moment library for date formatting
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AdminHome = () => {
  const todayDate = moment().format('MMMM D, YYYY'); // Format today's date
  const navigation = useNavigation();

  // Function to handle button press and navigate to another screen
  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName); // Navigate to the specified screen
  };

  // Function to handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Navigate to the login page if the user confirms
            navigation.navigate('Login');
            setTimeout(() => {
              Alert.alert('Logged Out', 'You have been logged out.');
            }, 500); // Show the alert after a short delay
          },
        },
      ],
      { cancelable: false }
    );
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
        {/* Button View Complaint Section */}
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('ViewComplaint')}>
          <MaterialIcons name="view-module" size={30} color="black" />
          <Text style={styles.buttonText}>View Complaints</Text>
        </TouchableOpacity>

        {/* Button User CRUD Section */}
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('UserUpdation')}>
          <MaterialIcons name="create" size={30} color="black" />
          <Text style={styles.buttonText}>CRUD user</Text>
        </TouchableOpacity>

        {/* Button View Suggestions */}
        <TouchableOpacity style={[styles.button, styles.viewSuggestionsButton]} onPress={() => handleButtonPress('SuggestionPage')}>
          <AntDesign name="customerservice" size={30} color="black" />
          <Text style={styles.buttonText}>View Suggestions</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={30} color="black" />
          <Text style={styles.buttonText}>Logout</Text>
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
    color: 'brown',
  },
  usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'brown',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    width: '48%', // Adjust button width as needed
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  viewSuggestionsButton: {
    width: '48%', // Full width for the "View Suggestions" button
  },
});

export default AdminHome;
