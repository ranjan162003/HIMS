import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!rollNo || !password) {
      alert('Please enter both Roll No and Password');
      return;
    }

    // Add your login logic here
    console.log('Roll No:', rollNo);
    console.log('Password:', password);

    if (rollNo === '2020' && password === 'admin') {
      // Navigate to admin screen
      navigation.navigate('AdminHome');
    } else {
      // Navigate to user home screen
      navigation.navigate('Home', { username: "Guest" });
    }
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
