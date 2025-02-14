import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { LOCATIONS } from '../data';
import { Ionicons } from '@expo/vector-icons';

const SelectLocationScreen = ({ navigation, route }) => {
  // Destructure the params
  const { 
    onLocationSelect, 
    currentLocation 
  } = route.params || {};

  // Use the currentLocation passed from the previous screen as initial state
  const [selectedLocation, setSelectedLocation] = useState(currentLocation || 'All Cities');

  const handleLocationSelect = (location) => {
    // Update the local state
    setSelectedLocation(location);
    
    // Call the location select callback with the new location
    onLocationSelect(location);
    
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={['All Cities', ...LOCATIONS]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.locationItem,
              item === selectedLocation && styles.selectedItem
            ]}
            onPress={() => handleLocationSelect(item)}
          >
            <Text style={styles.locationText}>{item}</Text>
            {item === selectedLocation && (
              <Ionicons name="checkmark" size={24} color="#333" />
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  selectedItem: {
    backgroundColor: '#f2f2f2',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default SelectLocationScreen;