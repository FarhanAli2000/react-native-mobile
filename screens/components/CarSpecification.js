// components/CarSpecification.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

const CarSpecification = ({ specs }) => {
  const renderSpecItem = (label, value) => (
    <View style={styles.specItem} key={label}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
 
  return (
    <View style={styles.specContainer}>
      <View style={styles.specList}>
        {Object.entries(specs).map(([key, value]) =>
          renderSpecItem(
            key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            value
          )
        )}
      </View>
    </View>
  );
 };
 

const styles = StyleSheet.create({
  specContainer: {
    backgroundColor: '#fff',
  },
  specList: {
    paddingHorizontal: 16,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specLabel: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600'
  },
  specValue: {
    fontSize: 14,
    color: '#666',
    
  },
});

export default CarSpecification;