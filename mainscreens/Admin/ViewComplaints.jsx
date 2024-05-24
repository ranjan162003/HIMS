import React, { useState,useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import API from '../../config';

const ViewComplaint = () => {
  // Sample data for users, issues, and statuses
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for modal
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
    let a = await axios.get(`${API}/issues/view`);
    console.log(a.data)
    setData(a.data);
    }
    fetchData();
}, []);


  const [filterStatus, setFilterStatus] = useState('all');


  // const handleSearch = (text) => {
  //   setSearchText(text);
  // };


  const handleRowPress = async (item) => {
    
    try {
      let response = await axios.get(`${API}/students/get`,{headers:{rollNumber:item.roll_number}});
      if (response.status === 200) {
        console.log(response.data)
        item.room_number=response.data[0].room_number
        item.block_id=response.data[0].block_id
        let response2 = await axios.get(`${API}/blocks/viewBy`,{headers:{block_id:item.block_id}});
        item.block_name=response2.data[0].block_name
        // console.log(item)
        setSelectedItem(item);
      }
      // closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleMarkStatusPress = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to mark this issue as resolved?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              let response = await axios.get(`${API}/issues/resolved/${selectedItem.issue_id}`);
              if (response.status === 200) {
                setData(data.map(item => item.issue_id === selectedItem.issue_id ? { ...item, status: true } : item));
              }
              closeModal();
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleFilterStatus = (status) => {
    if (status == 'all') {
      setFilterStatus(status);
      } else if (status == 'pending') {
      setFilterStatus(false);
      } else if (status == 'resolved') {
      setFilterStatus(true);
      }
  };
  function convertDateFormat(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}-${month}-${year} `;
}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
          onPress={() => handleFilterStatus('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterStatus === false && styles.activeFilter]}
          onPress={() => handleFilterStatus('pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterStatus === true && styles.activeFilter]}
          onPress={() => handleFilterStatus('resolved')}
        >
          <Text style={styles.filterText}>Resolved</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>User</Text>
            <Text style={styles.headerCell}>Issue Category</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Status</Text>
          </View>
          {data
          .filter(item =>
            item.roll_number?.toString().toLowerCase().includes(searchText?.toLowerCase()) ||
            item.issue_category?.toLowerCase().includes(searchText?.toLowerCase()) ||
            item.created_at?.toLowerCase().includes(searchText?.toLowerCase())
          )
            .filter(item => filterStatus === 'all' || item.status === filterStatus) // Apply status filter
            .map(item => (
              <TouchableOpacity key={item.id } onPress={() => handleRowPress(item)}>
                <View style={styles.dataRow}>
                  <Text style={styles.dataCell}>{item.roll_number}</Text>
                  <Text style={styles.dataCell}>{item.issue_category}</Text>
                  <Text style={styles.dataCell}>{convertDateFormat(item.created_at)}</Text>
                  <Text style={styles.dataCell}>{item.status ? 'Resolved' : 'Pending'}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      {/* Modal to display individual row data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedItem !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>User: <Text>{selectedItem?.roll_number}</Text></Text>
            <Text style={styles.modalText}>Block No: <Text>{selectedItem?.block_id}</Text></Text>
            <Text style={styles.modalText}>Block Name: <Text>{selectedItem?.block_name}</Text></Text>
            <Text style={styles.modalText}>Room No: <Text>{selectedItem?.room_number}</Text></Text>
            <Text style={styles.modalText}>Issue: <Text>{selectedItem?.issue_category}</Text></Text>
            <Text style={styles.modalText}>Accesssory: <Text>{selectedItem?.accessory?selectedItem?.accessory: '-'}</Text></Text>
            <Text style={styles.modalText}>Issue Type: <Text>{selectedItem?.issue_type}</Text></Text>
            <Text style={styles.modalText}>Requested On: <Text>{convertDateFormat(selectedItem?.created_at)}</Text></Text>
            
            <Text style={styles.modalText}>Additional Info: <Text>{selectedItem?.issue_description?selectedItem?.issue_description : '-'}</Text></Text>
            {/* <Text style={styles.modalText}>Hostel Name: <Text>{selectedItem?.hostelName}</Text></Text> */}

            <Text style={styles.modalText}>Status: <Text>{selectedItem?.status ? 'Resolved' : 'Pending'}</Text></Text>
            {selectedItem?.status && <Text style={styles.modalText}>Resolved On: <Text>{convertDateFormat(selectedItem?.updated_at)}</Text></Text> }
          {!selectedItem?.status && <TouchableOpacity onPress={handleMarkStatusPress}>
              <Text style={styles.modalStatusButton}>
                Mark Resolved
              </Text>
            </TouchableOpacity>}
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
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#0066FF',
  },
  filterText: {
    color: '#000',
    fontWeight: 'bold',
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
    // fontSize:18,
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
  modalStatusButton: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'blue',
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

export default ViewComplaint;
