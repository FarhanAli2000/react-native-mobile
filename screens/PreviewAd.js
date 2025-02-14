import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from './theme';

const PreviewAd = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { adDetails } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#2D4495" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ad Preview</Text>
      </View>

      {/* Images Carousel */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.imageCarousel}
      >
        {adDetails.images.map((uri, index) => (
          <Image 
            key={index} 
            source={{ uri }} 
            style={styles.carouselImage} 
          />
        ))}
      </ScrollView>

      {/* Ad Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{adDetails.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Price:</Text>
          <Text style={styles.valueText}>PKR {adDetails.price}</Text>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{adDetails.description}</Text>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Ad Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Purpose:</Text>
          <Text style={styles.valueText}>{adDetails.purpose}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Category:</Text>
          <Text style={styles.valueText}>{adDetails.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Subcategory:</Text>
          <Text style={styles.valueText}>{adDetails.subCategory}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Location:</Text>
          <Text style={styles.valueText}>{adDetails.location}, {adDetails.city}</Text>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Name:</Text>
          <Text style={styles.valueText}>{adDetails.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Email:</Text>
          <Text style={styles.valueText}>{adDetails.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Mobile:</Text>
          <Text style={styles.valueText}>{adDetails.mobileNumber}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.editButton}
          buttonColor="#2D4495"
        >
          Edit Ad
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log('Post Ad')}
          style={styles.postButton}
          buttonColor="#FFFFFF"
          textColor="#2D4495"
        >
          Post Ad
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop:50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
  },
  imageCarousel: {
    marginVertical: 15,
  },
  carouselImage: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: '#666',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  actionButtons: {
    padding: 15,
  },
  editButton: {
    marginBottom: 10,
  },
});

export default PreviewAd;