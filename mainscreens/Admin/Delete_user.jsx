import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import API from '../../config';
import axios from 'axios';
import AdminHome from './admin-HomeScreen';

const DeleteUserPage = (navigation) => {
  const [rollNumber, setRollNumber] = useState('');

  // let issue={rollNumber:rollNumber}

  const deleteUser = async () => {
    const submit = async ()=>{
      var result = await axios.delete(`${API}/students/delete`,{rollNumber:rollNumber})
      console.log(result.data)
      return result.data 
    }
    try {
      const result = await submit()
      // Send a DELETE request to your backend API to delete the user
      // const response = await fetch(`${API}/students/delete`, {
      //   method: 'DELETE',
      //   body: JSON.stringify({
      //     rollNumber,
      //   }),
      // });
      Alert.alert('User Deleted', 'User has been successfully deleted!');
      navigation.navigate(AdminHome);
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number to Delete"
        value={rollNumber}
        onChangeText={setRollNumber}
        keyboardType="numeric"
      />
      <Button title="Delete User" onPress={deleteUser} color="#FF3333" />
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

export default DeleteUserPage;
