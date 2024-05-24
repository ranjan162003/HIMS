import React, { useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {IssueContext} from '../Context/issueCreationContext'
import Sidebar from '../Sidebar'; // Import Sidebar component

const HomeScreen = ({ route }) => {
  const {issue,issueDispatch}=useContext(IssueContext)
  // const { username } = issue.name
  const todayDate = moment().format('MMMM D, YYYY');

  const navigation = useNavigation();

  {/*const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };*/}
  // useEffect()

  const handleButtonPress = async (screenName) => {
    if (screenName!='OtherSectionScreen' && screenName!='RequestSectionScreen'){
      await issueDispatch({type:'setIssueCategory',payload:{issueCategory:screenName}})
      console.log(issue)
    }
    navigation.navigate(screenName);
  };

  {/*const handleLogout = () => {
    alert('Logout');
  };

  const handleStatusClick = () => {
    navigation.navigate('StatusScreen');
  };*/}

  return (
    <View style={styles.container}>
    { /*{isMenuVisible && (
        <Sidebar onLogout={handleLogout} onStatusClick={handleStatusClick} />
      )}

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>*/}

      <Text style={styles.welcomeText}>Welcome</Text>

      <Text style={styles.usernameText}>{issue.name}</Text>

      <Text style={styles.dateText}>{todayDate}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Electrical')}>
          <FontAwesome name="bolt" size={30} color="black" />
          <Text style={styles.buttonText}>Electrical</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Carpenter')}>
          <MaterialIcons name="carpenter" size={30} color="black" />
          <Text style={styles.buttonText}>Carpenter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Wifi')}>
          <FontAwesome name="wifi" size={30} color="black" />
          <Text style={styles.buttonText}>Wi-fi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('OtherSectionScreen')}>
          <FontAwesome name="plus" size={30} color="black" />
          <Text style={styles.buttonText}>Others</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonforrequest} onPress={() => handleButtonPress('RequestSectionScreen')}>
          <FontAwesome name="commenting" size={30} color="black" />
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 35,
    marginBottom: 1,
    color: 'brown',
  },
  usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'brown',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 35,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    width: '48%',
    height: '100%',
    aspectRatio: 7 / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  buttonforrequest: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    height: '15%',
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 999,
  },
});

export default HomeScreen;
