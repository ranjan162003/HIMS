import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

const CarpenterScreen = () => {
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const accessories = ['Chair', 'Table', 'Window', 'Bed', 'Door', 'Other']; // List of carpentry accessories including "Other"
  const issues = ['Broken', 'Wobbly', 'Scratched','Other']; // Common issues for carpentry accessories

  const navigation = useNavigation();

  const handleAccessorySelection = (accessory) => {
    setSelectedAccessory(accessory);
    setSelectedIssue(null); // Reset selected issue when accessory changes
    setAdditionalDetails(''); // Clear additional details
    setRequestSubmitted(false); // Hide success message
    
    
  };

  const handleIssueSelection = (issue) => {
    setSelectedIssue(issue);
    setAdditionalDetails(''); // Reset additional details when issue changes
    setRequestSubmitted(false); // Hide success message
  };

  const handleSubmit = () => {
    if (!selectedIssue) {
      // If no issue is selected, show alert message
      Alert.alert(
        'No Issue Selected',
        'Please select an issue.',
        [{ text: 'OK', style: 'destructive' }]
      );
      return;
    }
    if ((selectedIssue === 'Other' && additionalDetails.trim() === '')||(selectedAccessory === 'Other' && additionalDetails.trim() === '')) {
      // If additional details are not provided, show alert in red
      Alert.alert(
        'Other Section Not Filled',
        'Please fill in the details.',
        [{ text: 'OK', style: 'destructive' }]
      );
      return;
    }
  
    // Logic to submit the carpentry issue
    console.log('Selected Accessory:', selectedAccessory);
    console.log('Selected Issue:', selectedIssue);
    console.log('Additional Details:', additionalDetails);
    // You can add further logic here to send the issue report to backend or maintenance staff

    // Simulating submission by setting requestSubmitted to true
    setRequestSubmitted(true);
  };
  useEffect(() => {
    if (requestSubmitted) {
      Alert.alert(
        'Response Success',
        'Admin will resolve the complaint shortly',
        [{ text: 'OK', onPress: () => {setSelectedAccessory(null), navigation.navigate('Home', { username: "Guest" })} }]
      );
    }
  }, [requestSubmitted]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {selectedAccessory ? (
          <>
            {selectedAccessory !== 'Other' && ( // Render issue selection only if accessory is not "Other"
              <>
                <Text style={styles.heading}>Select Issue:</Text>
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
              </>
            )}

            {(selectedIssue || selectedAccessory === 'Other') && ( // Render additional details only if issue is selected or accessory is "Other"
              <>
                <Text style={styles.heading}>Additional Details:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setAdditionalDetails(text)}
                  value={additionalDetails}
                  placeholder="Enter complaint details ..."
                  multiline
                />
              </>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {requestSubmitted && (
              <Text style={styles.successMessage}>Request has been sent to the admin. They will respond shortly.</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.heading}>Select Carpenter Accessory:</Text>
            <View style={styles.buttonsContainer}>
              {accessories.map((accessory, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, selectedAccessory === accessory && styles.selectedButton]}
                  onPress={() => handleAccessorySelection(accessory)}
                >
                  <Text style={styles.buttonText}>{accessory}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
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

export default CarpenterScreen;
