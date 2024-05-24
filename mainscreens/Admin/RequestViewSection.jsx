    import React, { useState, useEffect } from 'react';
    import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
    import axios from 'axios';
    import API from '../../config';

    const SuggestionViewPage = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [selectedSuggestion, setSelectedSuggestion] = useState(null); // State to store selected suggestion for modal
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        async function fetchData() {
        let a = await axios.get(`${API}/request/view`);
        // console.log(a.data)
        setSuggestions(a.data);
        }
        fetchData();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const handleRowPress = async (item) => {
    
        try {
            let response = await axios.get(`${API}/students/get`,{headers:{rollNumber:item.roll_number}});
            if (response.status === 200) {
            console.log(response.data)
            item.student_name=response.data[0].student_name
            item.room_number=response.data[0].room_number
            item.block_id=response.data[0].block_id
            let response2 = await axios.get(`${API}/blocks/viewBy`,{headers:{block_id:item.block_id}});
            item.block_name=response2.data[0].block_name
            // console.log(item)
            setSelectedSuggestion(item);
        }
          // closeModal();
        } catch (error) {
            console.error(error);
        }
        };

    const closeModal = () => {
        setSelectedSuggestion(null);
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
            onChangeText={handleSearch}
        />
        <View style={styles.table}>
            <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Rollnumber</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Suggestion</Text>
            </View>
            {suggestions
            .filter(suggestion => 
                suggestion.roll_number?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                suggestion.created_at?.includes(searchText) ||
                suggestion.request_description?.toLowerCase().includes(searchText.toLowerCase()))
            .map(suggestion => (
                <TouchableOpacity key={suggestion.id} onPress={() => handleRowPress(suggestion)}>
                <View style={styles.dataRow}>
                    <Text style={styles.dataCell}>{suggestion.roll_number}</Text>
                    <Text style={styles.dataCell}>{convertDateFormat(suggestion.created_at)}</Text>
                    <Text style={styles.dataCell}>{suggestion.request_description}</Text>
                </View>
                </TouchableOpacity>
            ))}
        </View>
        
        {/* Modal to display individual suggestion data */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={selectedSuggestion !== null}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Username: {selectedSuggestion?.student_name}</Text>
                <Text style={styles.modalText}>Block: {selectedSuggestion?.block_name}</Text>
                <Text style={styles.modalText}>Block No: {selectedSuggestion?.block_id}</Text>
                <Text style={styles.modalText}>Room No: {selectedSuggestion?.room_number}</Text>
                <Text style={styles.modalText}>Date: {selectedSuggestion?.created_at}</Text>
                <Text style={styles.modalText}>Suggestion: {selectedSuggestion?.request_description}</Text>
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

    export default SuggestionViewPage;
