import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
const UserUpdation = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [operation, setOperation] = useState('');
  

  const createUser = async () => {
    try {
      // Send a POST request to your backend API to create a new user
      const response = await fetch('your_backend_api_url/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await response.json();
      Alert.alert('User Created', 'User has been successfully created!');
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user. Please try again later.');
    }
  };

  const deleteUser = async () => {
    try {
      // Send a DELETE request to your backend API to delete the user
      const response = await fetch(`your_backend_api_url/users/${userId}`, {
        method: 'DELETE',
      });
      Alert.alert('User Deleted', 'User has been successfully deleted!');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user. Please try again later.');
    }
  };

  const updateUser = async () => {
    try {
      // Send a PUT request to your backend API to update the user
      const response = await fetch(`your_backend_api_url/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      Alert.alert('User Updated', 'User has been successfully updated!');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update user. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {operation !== 'delete' && (
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
        keyboardType="numeric"
      />
      <View style={styles.buttonsContainer}>
        <Button title="Create User" onPress={() => {setOperation('create'); createUser()}} color="#0066FF" />
        <Button title="Delete User" onPress={() => {setOperation('delete'); deleteUser()}} color="#FF3333" />
        <Button title="Update User" onPress={() => {setOperation('update'); updateUser()}} color="#33CC33" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default UserUpdation;