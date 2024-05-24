import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import API from '../../config';

const CreateUserPage = ({navigation}) => {
  const [studentName, setstudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [blockId, setblockId] = useState('');
  const [roomNumber, setRoomNumber] = useState(''); 
  const [password, setPassword] = useState('');

  const createUser = async () => {
    try {
      // Send a POST request to your backend API to create a new user
      const response = await fetch(`${API}/students/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          rollNumber,
          phoneNumber,
          emailId,
          courseName,
          blockId,
          roomNumber,
          password,
        }),
      });
      const data = await response.json();
      console.log(data)
      Alert.alert('User Created', 'User has been successfully created!');
      navigation.navigate('AdminHome');
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="studentName"
        value={studentName}
        onChangeText={setstudentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        value={emailId}
        onChangeText={setEmailId}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Hostel Id"
        value={blockId}
        onChangeText={setblockId}
      />
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Create User" onPress={createUser} color="#0066FF" />
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
});

export default CreateUserPage;
