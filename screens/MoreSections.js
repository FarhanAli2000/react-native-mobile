import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors, theme } from './theme';


const sections = [
    {
      id: '1',
      title: 'Pricing Plans',
      icon: 'pricetag',
      iconOutline: 'pricetag-outline',
      screen: 'PricingPlansScreen',
      color: theme.colors.primary.primary1,
    },
    {
      id: '2',
      title: 'Payment Gateways',
      icon: 'card',
      iconOutline: 'card-outline',
      screen: 'PaymentGatewayScreen',
      color: theme.colors.primary.primary1,
    },
    {
      id: '3',
      title: 'Reviews',
      icon: 'star',
      iconOutline: 'star-outline',
      screen: 'ReviewScreen',
      color: theme.colors.primary.primary1,
    },
    {
      id: '4',
      title: 'Transaction History',
      icon: 'receipt',
      iconOutline: 'receipt-outline',
      screen: 'TransactionHistoryScreen',
      color: theme.colors.primary.primary1,
    },
    {
      id: '5',
      title: 'Seller Details',
      icon: 'person',
      iconOutline: 'person-outline',
      screen: 'SellerDetailScreen',
      color: theme.colors.primary.primary1,
    },
    {
      id: '6',
      title: 'Vehicle Listing',
      icon: 'car',
      iconOutline: 'car-outline',
      screen: 'VehicleListingScreen',
      color: theme.colors.primary.primary1,
    },
  ];

const MoreSections = () => {
  const navigation = useNavigation();
  const [hoveredSection, setHoveredSection] = React.useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Ionicons name="settings" size={24} color="white" />
          <Text style={styles.title}>Settings</Text>
        </View>
      </View>

      {/* Sections Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[styles.section, { backgroundColor: section.color }]}
              onPress={() => navigation.navigate(section.screen)}
              onPressIn={() => setHoveredSection(section.id)}
              onPressOut={() => setHoveredSection(null)}
            >
              <Ionicons 
                name={hoveredSection === section.id ? section.icon : section.iconOutline} 
                size={32} 
                color="white" 
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    height: 100,
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    paddingTop:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  section: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default MoreSections;