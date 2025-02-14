// screens/SavedAdsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const SAVED_ADS = [
  {
    id: 1,
    title: 'Honda Vezel Hybrid RS H...',
    price: '62.5 lacs',
    location: 'Faisalabad',
    year: '2016',
    mileage: '120,237 km',
    rating: '4.5',
    score: '9.0/10',
    imageCount: 14,
    isFavorite: true,
    isManaged: true,
    isInspected: true,
  },
  {
    id: 2,
    title: 'Honda Vezel Hybrid RS H...',
    price: '62.5 lacs',
    location: 'Faisalabad',
    year: '2016',
    mileage: '120,237 km',
    rating: '4.5',
    score: '9.0/10',
    imageCount: 14,
    isFavorite: true,
    isManaged: true,
    isInspected: true,
  },
    {
      id: 3,
      title: 'Honda Vezel Hybrid RS H...',
      price: '62.5 lacs',
      location: 'Faisalabad',
      year: '2016',
      mileage: '120,237 km',
      rating: '4.5',
      score: '9.0/10',
      imageCount: 14,
      isFavorite: true,
      isManaged: true,
      isInspected: true,
    },
    {
      id: 4,
      title: 'Honda Vezel Hybrid RS H...',
      price: '62.5 lacs',
      location: 'Faisalabad',
      year: '2016',
      mileage: '120,237 km',
      rating: '4.5',
      score: '9.0/10',
      imageCount: 14,
      isFavorite: true,
      isManaged: true,
      isInspected: true,
    },
      {
        id: 5,
        title: 'Honda Vezel Hybrid RS H...',
        price: '62.5 lacs',
        location: 'Faisalabad',
        year: '2016',
        mileage: '120,237 km',
        rating: '4.5',
        score: '9.0/10',
        imageCount: 14,
        isFavorite: true,
        isManaged: true,
        isInspected: true,
      },
      {
        id: 6,
        title: 'Honda Vezel Hybrid RS H...',
        price: '62.5 lacs',
        location: 'Faisalabad',
        year: '2016',
        mileage: '120,237 km',
        rating: '4.5',
        score: '9.0/10',
        imageCount: 14,
        isFavorite: true,
        isManaged: true,
        isInspected: true,
      },
];

const SavedAdsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary.primary1}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondary.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Saved Count */}
      <Text style={styles.savedCount}>
        {SAVED_ADS.length} Favorites {SAVED_ADS.length === 1 ? 'Ad' : 'Ads'}
      </Text>

      {/* Saved Ads List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {SAVED_ADS.map((ad) => (
          <TouchableOpacity
            key={ad.id}
            style={styles.adCard}
            onPress={() => navigation.navigate('AdDetailScreen', { ad })}
            activeOpacity={0.9}
          >
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/car1.jpeg')}
                  style={styles.adImage}
                />
                <View style={styles.imageCountContainer}>
                  <Ionicons name="camera-outline" size={14} color="#fff" />
                  <Text style={styles.imageCountText}>{ad.imageCount}</Text>
                </View>

              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.adTitle} numberOfLines={2}>
                    {ad.title}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{ad.score}</Text>
                  </View>
                </View>

                <Text style={styles.priceText}>PKR {ad.price}</Text>
                <Text style={styles.locationText}>{ad.location}</Text>

                <Text style={styles.specificationText}>
                  {ad.year} | {ad.mileage} | {ad.rating}
                </Text>

                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => {/* Handle favorite toggle */}}
                >
                  <Ionicons name="heart" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop:40,
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: theme.colors.secondary.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  savedCount: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  adCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    height: 140,
  },
  imageContainer: {
    width: 140,
    height: '100%',
    position: 'relative',
  },
  adImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCountContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  imageCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  starBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.secondary.secondary1,
    padding: 4,
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    position: 'relative',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  specificationText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  managedBadge: {
    borderWidth: 1,
    borderColor: theme.colors.primary.primary1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  managedBadgeText: {
    color: theme.colors.primary.primary1,
    fontSize: 11,
    fontWeight: '500',
  },
  inspectionBadge: {
    borderWidth: 1,
    borderColor: theme.colors.primary.primary2,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  inspectionBadgeText: {
    color: theme.colors.primary.primary2,
    fontSize: 11,
    fontWeight: '500',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  bottomPadding: {
    height: 20,
  },
});

export default SavedAdsScreen;