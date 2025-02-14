import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from "./theme";

const ExtendedFilterScreen = ({ navigation }) => {
  const [automatic, setAutomatic] = useState(false);
  const [location, setLocation] = useState('');
  const [carModel, setCarModel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [modelYearRange, setModelYearRange] = useState([1970, 2024]);
  const [kmsDriven, setKmsDriven] = useState(0);
  const [trustCertified, setTrustCertified] = useState(false);
  const [transmission, setTransmission] = useState('');
  const [bodyColor, setBodyColor] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState(0);
  const [assembly, setAssembly] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [sellerType, setSellerType] = useState('');
  const [numDoors, setNumDoors] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');

  const handleResetAll = () => {
    // Reset all filter states
    setAutomatic(false);
    setLocation('');
    setCarModel('');
    setPriceRange([0, 10000000]);
    setModelYearRange([1970, 2024]);
    setKmsDriven(0);
    setTrustCertified(false);
    setTransmission('');
    setBodyColor('');
    setFuelType('');
    setEngineCapacity(0);
    setAssembly('');
    setBodyType('');
    setSellerType('');
    setNumDoors('');
    setSeatingCapacity('');
  };

  const handleApplyFilters = () => {
    // Apply the selected filters
    if (navigation) {
      navigation.goBack();
    }
  };

  const locationOptions = [
    { label: 'Select location', value: '' },
    { label: 'Lahore', value: 'lahore' },
    { label: 'Karachi', value: 'karachi' },
  ];

  const carModelOptions = [
    { label: 'Select car model', value: '' },
    { label: 'Toyota Corolla', value: 'toyota-corolla' },
    { label: 'Honda Civic', value: 'honda-civic' },
  ];

  const transmissionOptions = [
    { label: 'Select transmission', value: '' },
    { label: 'Automatic', value: 'automatic' },
    { label: 'Manual', value: 'manual' },
  ];

  const bodyColorOptions = [
    { label: 'Select body color', value: '' },
    { label: 'White', value: 'white' },
    { label: 'Silver', value: 'silver' },
    { label: 'Black', value: 'black' },
    { label: 'Grey', value: 'grey' },
    { label: 'Blue', value: 'blue' },
  ];

  const fuelTypeOptions = [
    { label: 'Select fuel type', value: '' },
    { label: 'Petrol', value: 'petrol' },
    { label: 'Diesel', value: 'diesel' },
    { label: 'CNG', value: 'cng' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'LPG', value: 'lpg' },
    { label: 'Electric', value: 'electric' },
  ];

  const assemblyOptions = [
    { label: 'Select assembly', value: '' },
    { label: 'Imported', value: 'imported' },
    { label: 'Local', value: 'local' },
  ];

  const bodyTypeOptions = [
    { label: 'Select body type', value: '' },
    { label: 'Convertible', value: 'convertible' },
    { label: 'Coupe', value: 'coupe' },
    { label: 'Hatchback', value: 'hatchback' },
    { label: 'Micro Van', value: 'micro-van' },
    { label: 'SUV', value: 'suv' },
  ];

  const sellerTypeOptions = [
    { label: 'Select seller type', value: '' },
    { label: 'Authorized Dealer', value: 'authorized-dealer' },
    { label: 'Private Seller', value: 'private-seller' },
  ];

  const numDoorsOptions = [
    { label: 'Select number of doors', value: '' },
    { label: '2 Doors', value: '2' },
    { label: '4 Doors', value: '4' },
  ];

  const seatingCapacityOptions = [
    { label: 'Select seating capacity', value: '' },
    { label: '4 Seats', value: '4' },
    { label: '5 Seats', value: '5' },
    { label: '7 Seats', value: '7' },
  ];

  return (
    <View style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <AntDesign name="left" size={24} color="#fff" />
                </TouchableOpacity>
        <Text style={styles.headerText}>Refine Your Search</Text>
      </View>
  
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Location filter */}
        <View style={styles.filterSection}>
          <Text>Location</Text>
          <RNPickerSelect
            onValueChange={setLocation}
            items={locationOptions}
            value={location}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Car model filter */}
        <View style={styles.filterSection}>
          <Text>Car Model</Text>
          <RNPickerSelect
            onValueChange={setCarModel}
            items={carModelOptions}
            value={carModel}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Price range filter */}
        <View style={styles.filterSection}>
          <Text>Price Range (PKR)</Text>
          <Slider
            minimumValue={0}
            maximumValue={10000000}
            value={priceRange[0]}
            onValueChange={(value) => setPriceRange([value, priceRange[1]])}
          />
        </View>
  
        {/* Model year range filter */}
        <View style={styles.filterSection}>
          <Text>Model Year Range</Text>
          <Slider
            minimumValue={1970}
            maximumValue={2024}
            value={modelYearRange[0]}
            onValueChange={(value) => setModelYearRange([value, modelYearRange[1]])}
          />
        </View>
  
        {/* KMs driven filter */}
        <View style={styles.filterSection}>
          <Text>KMs Driven</Text>
          <Slider
            minimumValue={0}
            maximumValue={500000}
            value={kmsDriven}
            onValueChange={setKmsDriven}
          />
        </View>
  
        {/* Trust certified filter */}
        <View style={styles.filterSection}>
          <Text>Trust Certified</Text>
          <Switch
            value={trustCertified}
            onValueChange={setTrustCertified}
          />
        </View>
  
        {/* Transmission filter */}
        <View style={styles.filterSection}>
          <Text>Transmission</Text>
          <RNPickerSelect
            onValueChange={setTransmission}
            items={transmissionOptions}
            value={transmission}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Body color filter */}
        <View style={styles.filterSection}>
          <Text>Body Color</Text>
          <RNPickerSelect
            onValueChange={setBodyColor}
            items={bodyColorOptions}
            value={bodyColor}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Fuel type filter */}
        <View style={styles.filterSection}>
          <Text>Fuel Type</Text>
          <RNPickerSelect
            onValueChange={setFuelType}
            items={fuelTypeOptions}
            value={fuelType}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Engine capacity filter */}
        <View style={styles.filterSection}>
          <Text>Engine Capacity (cc)</Text>
          <Slider
            minimumValue={400}
            maximumValue={5000}
            value={engineCapacity}
            onValueChange={setEngineCapacity}
          />
        </View>
  
        {/* Assembly filter */}
        <View style={styles.filterSection}>
          <Text>Assembly</Text>
          <RNPickerSelect
            onValueChange={setAssembly}
            items={assemblyOptions}
            value={assembly}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Body type filter */}
        <View style={styles.filterSection}>
          <Text>Body Type</Text>
          <RNPickerSelect
            onValueChange={setBodyType}
            items={bodyTypeOptions}
            value={bodyType}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Seller type filter */}
        <View style={styles.filterSection}>
          <Text>Seller Type</Text>
          <RNPickerSelect
            onValueChange={setSellerType}
            items={sellerTypeOptions}
            value={sellerType}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Number of doors filter */}
        <View style={styles.filterSection}>
          <Text>Number of Doors</Text>
          <RNPickerSelect
            onValueChange={setNumDoors}
            items={numDoorsOptions}
            value={numDoors}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Seating capacity filter */}
        <View style={styles.filterSection}>
          <Text>Seating Capacity</Text>
          <RNPickerSelect
            onValueChange={setSeatingCapacity}
            items={seatingCapacityOptions}
            value={seatingCapacity}
            style={pickerSelectStyles}
          />
        </View>
  
        {/* Reset All and Apply Filters buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetAll}>
            <Text style={styles.buttonText1}>Reset All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    
  },
  filterSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom:50,
  },
  scrollContent: {
    paddingTop: 80, 
  },
  resetButton: {
    backgroundColor: '#EBEBEB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 2, 
    borderColor: theme.colors.primary.primary1,
    marginStart:20

},
  applyButton: {
    backgroundColor: theme.colors.primary.primary1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginEnd:20
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#000000',
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom:20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    marginBottom:20,
    backgroundColor:theme.colors.primary.primary1
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color:'#fff'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default ExtendedFilterScreen;


