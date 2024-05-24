import React, { useEffect, useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import {Picker} from '@react-native-picker/picker';
import {IssueContext} from './Context/issueCreationContext'
// import nodemailer from 'nodemailer'
import API from '../config';
// import product from '../meta'

const LoginScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const {issue,issueDispatch}=useContext(IssueContext)

  // useEffect(()=>{
  //   async function dummy(){
  //     await issueDispatch({type:'userLogout'})
  //   }
  //   dummy()
  // },[])

  // console.log(issue)

  const [selectedValue, setSelectedValue] = useState('Student');
  
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!rollNo || !password) {
      alert('Please enter both fields');
      return;
    }


    if (selectedValue=='Student'){
      let student={'rollNumber':`${rollNo}`,'password':`${password}`}

      const checkUser = async ()=> {
        // var result = await axios.post(`${API}/students/login`,student)
        // console.log(result.data)
        // return result.data
        return true
      }
      try {
        const userExistsAsStudent = await checkUser()
        if (userExistsAsStudent) {
          const details = await axios.get(`${API}/students/get`, { headers: { 'rollNumber': rollNo } });
          const name = details.data[0].student_name;

          await issueDispatch({type:'userLogin',payload:{rollNumber:rollNo,name:name}})
          console.log(issue)

          // navigation.navigate('Home', { username: name });
          navigation.navigate('Home')
        } 
      } catch (error) {
        // consol.log(error)
        console.error('Error logging in:', error);
        alert(`Error logging in. Please try again later.(${error})`);
      } finally {
        setPassword('');
        setRollNo('');
      }
    }else{
      const checkAdmin = async ()=>{
        // var result = await axios.get(`${API}/admin/login`,{headers:{adminId: rollNo, password:password}})
        // console.log(result.data)
        // return result.data 
        return true
      }
      try {
        const userExistsAsAdmin = await checkAdmin()
        if (userExistsAsAdmin) {
          navigation.navigate('AdminHome');
        } 
      } catch (error) {
        console.log(error)
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again later.');
      } finally {
        setPassword('');
        setRollNo('');
      }
    }

    

    // if (rollNo === '2020' && password === 'admin') {
    //   // Navigate to admin screen
    //   navigation.navigate('AdminHome');
    // } else if (checkUser()) {
    //   // Navigate to user home screen
    //   // checkUser(rollNo,password)
    //   // checkUser()
    //   console.log('user')
    //   navigation.navigate('Home', { username: "Guest" });
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/image.png")} // Replace with your background image
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Anna University</Text>
        <Text>Select an option:</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>
        <Text>You selected: {selectedValue}</Text>
        <Image source={require("../assets/annaunivlogo.png")} style={styles.image} />
        {selectedValue=='Student' && <TextInput
          style={styles.input}
          placeholder="Roll No"
          onChangeText={text => setRollNo(text)}
          value={rollNo}
          keyboardType="numeric"
        />}
        {selectedValue=='Admin' && <TextInput
          style={styles.input}
          placeholder="Admin ID"
          onChangeText={text => setRollNo(text)}
          value={rollNo}
          keyboardType="numeric"
        />}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', // Cover the entire screen
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%', // Ensure the image covers the entire container
    height: '100%', // Ensure the image covers the entire container
    opacity:0.4,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    color:'black',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white', // Added white background to prevent the image from being visible through inputs
  },
  loginButton: {
    backgroundColor: 'brown',
    padding: 12,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius:25
  },
});

export default LoginScreen;
