// components/CurrentFuelPrices.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, theme } from '../theme';

const FuelPriceRow = ({ type, price }) => (
  <View style={styles.row}>
    <Text style={styles.fuelType}>{type}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.currency}>PKR</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  </View>
);

const CurrentFuelPrices = () => {
  const fuelPrices = [
    { type: 'Petrol (Super)', price: '252.10' },
    { type: 'High Speed Diesel', price: '258.43' },
    { type: 'Light Speed Diesel', price: '151.73' },
    { type: 'Kerosene Oil', price: '164.98' },
    { type: 'CNG Region-I*', price: '190' },
    { type: 'CNG Region-II**', price: '190' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="gas-station" size={24} color="black" />
        </View>
        <Text style={styles.headerText}>Current Fuel Prices</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Price Per Liter</Text>
        </View>

        {fuelPrices.map((item, index) => (
          <FuelPriceRow
            key={index}
            type={item.type}
            price={item.price}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  tableContainer: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:  theme.colors.primary.primary1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  fuelType: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currency: {
    fontSize: 16,
    color: '#4B5563',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default CurrentFuelPrices;