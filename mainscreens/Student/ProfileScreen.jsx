import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import API from '../../config';
import { IssueContext } from '../Context/issueCreationContext';

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const { issue } = useContext(IssueContext);

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await axios.get(`${API}/students/get`, { headers: { rollNumber: issue.rollNumber } });
        setStudentData(response.data[0]);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    fetchStudentData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Profile</Text>
      {studentData ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Roll Number:</Text>
            <Text style={styles.value}>{studentData.roll_number}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Student Name:</Text>
            <Text style={styles.value}>{studentData.student_name}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Block ID:</Text>
            <Text style={styles.value}>{studentData.block_id}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Room Number:</Text>
            <Text style={styles.value}>{studentData.room_number}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Course Name:</Text>
            <Text style={styles.value}>{studentData.course_name}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{studentData.phone_number || 'Not available'}</Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#4285F4" style={styles.loadingIndicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4285F4', // Google blue color
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default ProfilePage;
