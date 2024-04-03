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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
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
  },
});

export default LoginScreen;
