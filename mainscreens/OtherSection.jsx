import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OtherSectionScreen = () => {
  const navigation  = useNavigation();

  const [selectedService, setSelectedService] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const services = ['Water', 'Mosquito', 'Heater'];

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setAdditionalDetails(''); // Clear additional details when service changes
    setRequestSubmitted(false); // Hide success message
  };

  const handleSubmit = () => {
    if (!selectedService || additionalDetails.trim() === '') {
      Alert.alert(
        'Incomplete Form',
        'Please select a service and provide additional details.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Logic to submit the complaint
    console.log('Selected Service:', selectedService);
    console.log('Additional Details:', additionalDetails);

    // Simulating submission by setting requestSubmitted to true
    setRequestSubmitted(true);

    // Show success message
    Alert.alert(
      'Request Submitted',
      'We will look into your complaint and respond shortly.',
      [{ text: 'OK', onPress: () => {setSelectedService(null), setAdditionalDetails(''),navigation.navigate('Home',{ username: "Guest" })  }}]
    );

    // Clear additional details after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Service:</Text>
      <View style={styles.buttonsContainer}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedService === service && styles.selectedButton]}
            onPress={() => handleServiceSelection(service)}
          >
            <Text style={styles.buttonText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {(!requestSubmitted && selectedService) && (
        <>
          <Text style={styles.heading}>Additional Details:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAdditionalDetails(text)}
            value={additionalDetails}
            placeholder="Enter additional details..."
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: 'brown',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 100,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtherSectionScreen;
