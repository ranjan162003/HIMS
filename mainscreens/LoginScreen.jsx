import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Picker,x Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import dotenv from 'dotenv'
// import nodemailer from 'nodemailer'
import API from '../config';
// import product from '../meta'

const LoginScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  useEffect(()=>{
    console.log(12)
  },[])

  const handleLogin = async () => {
    if (!rollNo || !password) {
      alert('Please enter both Roll No and Password');
      return;
    }

    // console.log('Roll No:', rollNo);
    // console.log('Password:', password);
    let student={'rollNumber':`${rollNo}`,'password':`${password}`}

    const checkUser = async ()=> {
      var result = await axios.post(`${API}/students/login`,student)
      console.log(result.data)
      return result.data
    }
    const checkAdmin = async ()=>{
      var result = await axios.post(`${API}/admin/login`,{headers:{adminId: rollNo, password:password}})
      console.log(result.data)
      return result.data 
    }

    try {
      const userExistsAsStudent = await checkUser();
      
      console.log(userExistsAsStudent)
      if (userExistsAsStudent) {
        const details = await axios.get(`${API}/students/get`, { headers: { 'rollNumber': rollNo } });
        const name = details.data[0].student_name;
        navigation.navigate('Home', { username: name });
      } else {
        // const userExistsAsAdmin = await checkAdmin();
        if (rollNo=='1' && password== 'Supreme.@12') {
          navigation.navigate('AdminHome');
        } else {
          // Neither user nor admin exists
          alert('Invalid Roll No or Password');
        }
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again later.');
    } finally {
      // Clear input fields
      setPassword('');
      setRollNo('');
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
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
        <Text>You selected: {selectedValue}</Text>
        <Image source={require("../assets/annaunivlogo.png")} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Roll No"
          onChangeText={text => setRollNo(text)}
          value={rollNo}
          keyboardType="numeric"
        />
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
