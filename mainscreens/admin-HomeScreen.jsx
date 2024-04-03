import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminHome = () => {
  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
      <Text>This is a test screen for Admin page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AdminHome;
