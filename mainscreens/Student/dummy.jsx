import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';

const StatusScreen = () => {
const [userData] = useState([
{ id: '1', complaintType: 'Electrical', issue: 'Faulty Switch', date: '24-05-15', status: 'resolved', additionalInfo: 'Additional Info for Row 1' },
{ id: '2', complaintType: 'Plumbing', issue: 'Leaking Faucet', date: '24-05-14', status: 'resolved', additionalInfo: 'Additional Info for Row 2' },
{ id: '3', complaintType: 'Maintenance', issue: 'Broken Chair', date: '4-05-13', status: 'pending', additionalInfo: 'Additional Info for Row 3' },
// Add more data as needed
]);

const [selectedItem, setSelectedItem] = useState(null);

const handleRowPress = (item) => {
setSelectedItem(item);
};

const closeModal = () => {
setSelectedItem(null);
};

return (
<View style={styles.container}>
    <Text style={styles.heading}>Your Complaint History</Text>
    <View style={styles.table}>
    <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Complaint Type</Text>
        <Text style={styles.headerCell}>Issue</Text>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Status</Text>
    </View>
    {userData.map(item => (
        <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
        <View style={styles.dataRow}>
            <Text style={styles.dataCell}>{item.complaintType}</Text>
            <Text style={styles.dataCell}>{item.issue}</Text>
            <Text style={styles.dataCell}>{item.date}</Text>
            <Text style={styles.dataCell}>{item.status}</Text>
        </View>
        </TouchableOpacity>
    ))}
    </View>

    {/* Modal to display additional column names and values */}
    <Modal
    animationType="slide"
    transparent={true}
    visible={selectedItem !== null}
    onRequestClose={closeModal}
    >
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalText}>Complaint Type: <Text>{selectedItem?.complaintType}</Text></Text>
        <Text style={styles.modalText}>Issue: <Text>{selectedItem?.issue}</Text></Text>
        <Text style={styles.modalText}>Date: <Text>{selectedItem?.date}</Text></Text>
        <Text style={styles.modalText}>Status: <Text>{selectedItem?.status}</Text></Text>
        <Text style={styles.modalText}>Additional Info: <Text>{selectedItem?.additionalInfo}</Text></Text>
        <TouchableHighlight onPress={closeModal} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseText}>Close</Text>
        </TouchableHighlight>
        </View>
    </View>
    </Modal>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
paddingHorizontal: 20,
paddingTop: 20,
},
heading: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
table: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
overflow: 'hidden',
},
headerRow: {
flexDirection: 'row',
borderBottomWidth: 1,
borderBottomColor: '#ccc',
backgroundColor: '#f1f8ff',
},
headerCell: {
flex: 1,
textAlign: 'center',
paddingVertical: 10,
fontWeight: 'bold',
},
dataRow: {
flexDirection: 'row',
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},
dataCell: {
flex: 1,
textAlign: 'center',
paddingVertical: 10,
textAlignVertical: 'center',
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
backgroundColor: 'white',
padding: 20,
borderRadius: 10,
width: '80%',
},
modalText: {
marginBottom: 10,
fontSize: 16,
},
modalCloseButton: {
marginTop: 10,
backgroundColor: '#ccc',
paddingVertical: 10,
borderRadius: 5,
},
modalCloseText: {
textAlign: 'center',
fontWeight: 'bold',
color: 'black',
},
});

export default StatusScreen;
