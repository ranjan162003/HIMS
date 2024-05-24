import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { compressToBase64 } from 'lz-string';
import axios from 'axios'
import API from '../../config';
import {IssueContext} from '../Context/issueCreationContext'

const ElectricalScreen = ({navigation}) => {
  const {issue,issueDispatch}=useContext(IssueContext)
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  // const [photoUri, setPhotoUri] = useState(null);

  // const navigation = useNavigation();

  const accessories = ['Switch Box', 'Fan', 'Light', 'Other'];
  const issues = ['Broken', 'Malfunction', 'Wirecut', 'Other'];

  // const handleAccessorySelection = (accessory) => {
  //   setSelectedAccessory(accessory);
  //   setSelectedIssue(null);
  //   setAdditionalDetails('');
  //   setRequestSubmitted(false);

  //   // setPhotoUri(null);
  // };
  const handleAccessorySelection= async (accessory)=>{
    setSelectedAccessory(accessory);
    await issueDispatch({type:'setAccessory', payload:{accessory:accessory}})
    console.log(issue)
  }

  

  // const handleIssueSelection = (issue) => {
  //   setSelectedIssue(issue);
  //   setAdditionalDetails('');
  //   setRequestSubmitted(false);
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
    // if (!selectedIssue) {
    //   Alert.alert(
    //     'No Issue Selected',
    //     'Please select an issue.',
    //     [{ text: 'OK', style: 'destructive' }]
    //   );
    //   // return;
    // }

    if ((selectedAccessory === 'Other' && additionalDetails.trim() === '') || (selectedIssue === 'Other' && additionalDetails.trim() === '')) {
      await new Promise(resolve => {
        Alert.alert(
          'Other Section Not Filled',
          'Please fill in the details.',
          [{ text: 'OK', style: 'destructive', onPress: resolve }]
        );
      }); // Scroll to the additional details section
      scrollViewRef.current.scrollToEnd({ animated: true });
      return;
      // return;
    }
    const submit = async ()=>{
      var result = await axios.post(`${API}/issues/insert`,issue)
      console.log(result.data)
      return result.data 
    }
    try{
        const result = await submit()
        await issueDispatch({type:'issueCreation'})
        await new Promise(resolve => {
          Alert.alert(
            'Request Submitted',
            'We will look into your complaint and respond shortly.',
            [{ text: 'OK', onPress: () => {setSelectedIssue(null),setSelectedAccessory(null), setAdditionalDetails(''),navigation.navigate('Home') }}]
          );
        });
        // Alert.alert(
        //   'Request Submitted',
        //   'We will look into your complaint and respond shortly.',
        //   [{ text: 'OK',   }}]
        // );
        // await issueDispatch({type:'issueCreation'})
    }catch(error){
      console.error(`Error occured : ${error}`)
    }
    // console.log('Selected Accessory:', selectedAccessory);
    // console.log('Selected Issue:', selectedIssue);
    // console.log('Additional Details:', additionalDetails);
    // setRequestSubmitted(true);
  };

  // const handleTakePhoto = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   const compressUriToBase64 = async (uri) => {
  //     try {
  //       const response = await fetch(uri);
  //       const blob = await response.blob();
  //       const fileReader = new FileReader();
  //       return new Promise((resolve, reject) => {
  //         fileReader.onload = async () => {
  //           const compressedBase64 = compressToBase64(fileReader.result);
  //           resolve(compressedBase64);
  //         };
  //         fileReader.onerror = (error) => {
  //           reject(error);
  //           alert("ERROR")
  //         };
  //         fileReader.readAsDataURL(blob);
  //       });
  //     } catch (error) {
  //       console.error('Failed to compress URI to base64:', error);
  //       return null;
  //     }
  //   };
  
    // if (!result.cancelled) {
    //   setPhotoUri(result.uri);
    //   Alert.alert(
    //     'Photo Attached',
    //     'Your photo has been attached.',
      
    //   );
    //   const uri = result.assets[0].uri;
    //   console.log(result)
    //   compressUriToBase64(uri).then((compressedBase64) => {
    //     console.log('Compressed Base64 representation:', compressedBase64);
    //   });
    //   console.log('RANJ')
  //   // }
  // };
  


  // useEffect(() => {
  //   if (requestSubmitted) {
  //     Alert.alert(
  //       'Response Success',
  //       'Admin will resolve the complaint shortly',
  //       [{ text: 'OK', onPress: () => { setSelectedAccessory(null), navigation.navigate('Home', { username: "Guest" }) } }]
  //     );
  //   }
  // }, [requestSubmitted]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {selectedAccessory ? (
          <>
            {selectedAccessory !== 'Other' && (
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

            {(selectedIssue || selectedAccessory === 'Other') && (
              <>
                <Text style={styles.heading}>Additional Details:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => handleAdditionalDetails(text)}
                  value={additionalDetails}
                  placeholder="Enter additional details..."
                  multiline
                />
                {/* <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
              <Text style={styles.photoButtonText}>Take Photo</Text>
            </TouchableOpacity> */}

            {/* {photoUri && <Image source={{ uri: photoUri }} style={styles.photoPreview} />} */}
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
            <Text style={styles.heading}>Select Electrical Accessory:</Text>
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
  photoButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
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

export default ElectricalScreen;
