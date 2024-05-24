    import React, { useState, useEffect, useContext } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native';
    import axios from 'axios';
    import API from '../../config';
    import { IssueContext } from '../Context/issueCreationContext';

    const StatusScreen = () => {
    const [userData, setUserData] = useState([]);
    const { issue, issueDispatch } = useContext(IssueContext);

    useEffect(() => {
        async function fetchData() {
        let a = await axios.get(`${API}/issues/viewBy/${issue.rollNumber}`);
        setUserData(a.data);
        }
        fetchData();
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilter = (status) => {
        if (status == 'all') {
        setFilterStatus(status);
        } else if (status == 'pending') {
        setFilterStatus(false);
        } else if (status == 'resolved') {
        setFilterStatus(true);
        }
    };

    const handleRowPress = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
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
        <Text style={styles.heading}>Your Complaint History</Text>
        <View style={styles.filterContainer}>
            <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
            onPress={() => handleFilter('all')}
            >
            <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.filterButton, filterStatus === false && styles.activeFilter]}
            onPress={() => handleFilter('pending')}
            >
            <Text style={styles.filterText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.filterButton, filterStatus === true && styles.activeFilter]}
            onPress={() => handleFilter('resolved')}
            >
            <Text style={styles.filterText}>Resolved</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.tableContainer}>
            <View style={styles.table}>
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Issue Category</Text>
                <Text style={styles.headerCell}>Accessory</Text>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>Status</Text>
            </View>
            {userData
                .filter((item) => filterStatus === 'all' || item.status === filterStatus)
                .map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
                    <View style={styles.dataRow}>
                    <Text style={styles.dataCell}>{item.issue_category}</Text>
                    <Text style={styles.dataCell}>{item.accessory ? item.accessory:'-'}</Text>
                    <Text style={styles.dataCell}>{convertDateFormat(item.created_at)}</Text>
                    <Text style={styles.dataCell}>{item.status ? 'Resolved' : 'Pending'}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            </View>
        </ScrollView>

        {/* Modal to display additional column names and values */}
        <Modal animationType="slide" transparent={true} visible={selectedItem !== null} onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalText}>
                Issue ID: <Text>{selectedItem?.issue_id}</Text>
                </Text>
                <Text style={styles.modalText}>
                Complaint Type: <Text>{selectedItem?.issue_category}</Text>
                </Text>
                <Text style={styles.modalText}>
                Issue: <Text>{selectedItem?.accessory?selectedItem?.accessory: '-'}</Text>
                </Text>
                <Text style={styles.modalText}>
                Date: <Text>{selectedItem?.created_at}</Text>
                </Text>
                <Text style={styles.modalText}>
                Status: <Text>{selectedItem?.status ? 'Resolved' : 'Pending'}</Text>
                </Text>
                <Text style={styles.modalText}>
                Additional Info: <Text>{selectedItem?.issue_description?selectedItem?.issue_description : '-'}</Text>
                </Text>
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
    tableContainer: {
        flex: 1,
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
