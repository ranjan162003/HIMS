import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert,Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {IssueContext} from './Context/issueCreationContext'

const Sidebar = () => {
  let [modalVisible,setModalVisible]=useState(false)
  const {issue,issueDispatch}=useContext(IssueContext)
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

  // const handleProfileClick = () => {
  //   navigation.navigate('Profile');
  // };
  const handleProfileClick = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
    <MaterialIcons name="account-circle" size={100} color="black" />
      <TouchableOpacity style={styles.menuItem} onPress={handleProfileClick}>
        <Text style={styles.menuItemText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleStatusClick}>
        <Text style={styles.menuItemText}>Status</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Student Details</Text>
            <View style={styles.table}>
              {Object.entries(issue).map(([key, value]) => (
                <View style={styles.row} key={key}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
