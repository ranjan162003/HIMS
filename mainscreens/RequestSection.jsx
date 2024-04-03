import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RequestSectionScreen = () => {
  const [requestText, setRequestText] = useState('');

  const navigation = useNavigation();


  const handleSubmit = () => {
    
    if (requestText.trim() === '') {
      Alert.alert('Empty Request', 'Please enter your request.', [{ text: 'OK' }]);
      return;
    }
    
    // Logic to submit the request to backend or handle it accordingly
    console.log('Request Submitted:', requestText);

    // Clear the text input after submission
    setRequestText('');

    // Show success message
    Alert.alert(
      'Request Submitted',
      'Admin will look into your request and respond shortly.',
      [{ text: 'OK', onPress: () => {navigation.navigate('Home',{ username: "Guest" })} }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submit Your Request</Text>
      <TextInput
        style={[styles.input, { fontSize: 16, paddingVertical: 20, paddingHorizontal: 15, borderRadius: 20 }]} // Adjust padding and borderRadius as needed
        onChangeText={text => setRequestText(text)}
        value={requestText}
        placeholder="Enter your request..."
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    maxHeight: 250,
    borderRadius: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RequestSectionScreen;
