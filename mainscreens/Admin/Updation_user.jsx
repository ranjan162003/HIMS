import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserUpdation = () => {
  const navigation = useNavigation();

  const navigateToCreateUserPage = () => {
    navigation.navigate('CreateUserPage');
  };

  const navigateToDeleteUserPage = () => {
    navigation.navigate('DeleteUserPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.note}>
        ***Please create users carefully and ensure that all details are correct. Deleting a user will remove them permanently from the system.****
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Create User" onPress={navigateToCreateUserPage} color="#0066FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete User" onPress={navigateToDeleteUserPage} color="#FF3333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  note: {
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize:25,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default UserUpdation;
