import React, { useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {IssueContext} from '../Context/issueCreationContext'
import axios from 'axios'
import API from '../../config';


const OtherSectionScreen = ({navigation}) => {

  const {issue,issueDispatch}=useContext(IssueContext)

  const [selectedService, setSelectedService] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState('');
  

  const services = ['Water', 'Mosquito', 'Heater'];

  // const handleServiceSelection = (service) => {
  //   setSelectedService(service);
  //   setAdditionalDetails('');
  // };

  const handleService = async (service)=>{
    setSelectedService(service);
    await issueDispatch({type:'setIssueCategory',payload:{issueCategory:service}})
    console.log(issue)
  }

  const handleAdditionalDetails = async (details)=>{
    setAdditionalDetails(details);
    await issueDispatch({type:'setAdditionalDetails',payload:{issueDescription:details}})
  }

  const handleSubmit = async () => {
    if (!selectedService || additionalDetails.trim() === '') {
      Alert.alert(
        'Incomplete Form',
        'Please select a service and provide additional details.',
        [{ text: 'OK' }]
      );
      return;
    }

    const submit = async ()=>{
      var result = await axios.post(`${API}/issues/insert`,issue)
      console.log(result.data)
      return result.data 
    }
    try{
      const result = await submit()
      Alert.alert(
        'Request Submitted',
        'We will look into your complaint and respond shortly.',
        [{ text: 'OK', onPress: () => {setSelectedService(null), setAdditionalDetails(''),navigation.navigate('Home')  }}]
      );
      await issueDispatch({type:'issueCreation'})
    }catch(error){
      console.error(`Error occured : ${error}`)
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Service:</Text>
      <View style={styles.buttonsContainer}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedService === service && styles.selectedButton]}
            onPress={() => handleService(service)}
          >
            <Text style={styles.buttonText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {(selectedService) && (
        <>
          <Text style={styles.heading}>Additional Details:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleAdditionalDetails(text)}
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
