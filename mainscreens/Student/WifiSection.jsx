import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'
import API from '../../config';
import {IssueContext} from '../Context/issueCreationContext'

const WifiScreen = ({navigation}) => {
  const {issue,issueDispatch}=useContext(IssueContext)

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // const navigation = useNavigation(); // Hook for navigation

  const issues = ['Range need to be increased', 'Not working', 'Other'];

  // const handleIssueSelection = (issue) => {
  //   setSelectedIssue(issue);
  //   if (issue !== 'Other') {
  //     // Clear additional details if issue is not "Other"
  //     setAdditionalDetails('');
  //   }
  //   setRequestSubmitted(false); // Hide success message
  // };

  const handleIssueSelection = async (issue) => {
    setSelectedIssue(issue);
    await issueDispatch({type:'setIssueType', payload:{issueType:issue}})
    // console.log(issue)
  };

  const handleAdditionalDetails = async (details)=>{
    setAdditionalDetails(details);
    await issueDispatch({type:'setAdditionalDetails',payload:{issueDescription:details}})
  }

  const handleSubmit = async () => {
    if (!selectedIssue) {
      // If no issue is selected, show alert message
      Alert.alert(
        'No Issue Selected',
        'Please select an issue.',
        [{ text: 'OK', style: 'destructive' }]
      );
      return;
    }
    // Check if the issue is "Other" and additional details are not provided
    if (selectedIssue === 'Other' && additionalDetails.trim() === '') {
      // If additional details are not provided, show alert in red
      Alert.alert(
        'Other Section Not Filled',
        'Please fill in the details.',
        [{ text: 'OK', style: 'destructive' }]
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
        await issueDispatch({type:'issueCreation'})
          Alert.alert(
            'Request Submitted',
            'We will look into your complaint and respond shortly.',
            [{ text: 'OK', onPress: () => {setSelectedIssue(null), setAdditionalDetails(''),navigation.navigate('Home') }}]
          );
        // Alert.alert(
        //   'Request Submitted',
        //   'We will look into your complaint and respond shortly.',
        //   [{ text: 'OK',   }}]
        // );
        // await issueDispatch({type:'issueCreation'})
    }catch(error){
      console.error(`Error occured : ${error}`)
    }

    // Logic to submit the wifi issue
    // console.log('Selected Issue:', selectedIssue);
    // console.log('Additional Details:', additionalDetails);
    // // You can add further logic here to send the issue report to backend or maintenance staff

    // // Simulating submission by setting requestSubmitted to true
    // setRequestSubmitted(true);
    //  // Reset selectedIssue and additionalDetails after submitting
    // setSelectedIssue(null);
    // setAdditionalDetails('');
  };

  // useEffect(() => {
  //   if (requestSubmitted) {
  //     Alert.alert(
  //       'Response Success',
  //       'Admin will resolve the complaint shortly',
  //       [{ text: 'OK', onPress: () => {setSelectedIssue(null),navigation.navigate('Home',{ username: "Guest" }) }}]
  //     );
  //   }
  // }, [requestSubmitted]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <>
          <Text style={styles.heading}>Select Wifi Issue:</Text>
          <View style={styles.buttonsContainer}>
            {issues.map((issue, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, selectedIssue === issue && styles.selectedButton]}
                onPress={() => handleIssueSelection(issue)}
              >
                <Text style={styles.buttonText}>{issue}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {(selectedIssue === 'Other') && (
            <>
              <Text style={styles.heading}>Enter Other Issue:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleAdditionalDetails(text)}
                value={additionalDetails}
                placeholder="Enter Details here..."
                multiline
              />
            </>
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          {/*{requestSubmitted && (
            <Text style={styles.successMessage}>Request has been sent to the admin. They will respond shortly.</Text>
          )}*/}
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
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
    justifyContent: 'space-between', // Align buttons evenly
  },
  button: {
    width: '100%', // Adjust button width as needed
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5, // Adjust vertical margin as needed
  },
  selectedButton: {
    backgroundColor: 'brown', // Change color for selected button
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
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WifiScreen;
