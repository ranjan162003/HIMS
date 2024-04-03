import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
const Sidebar = () => {
  const navigation  = useNavigation();
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
  
  const handleStatusClick = () => {
    navigation.navigate('StatusScreen');
  };
  return (
    <View style={styles.container}>
    <MaterialIcons name="account-circle" size={100} color="black" />
      <TouchableOpacity style={styles.menuItem} onPress={handleStatusClick}>
        <Text style={styles.menuItemText}>Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4A484',
    padding: 20,
    width: '55%',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Sidebar;
