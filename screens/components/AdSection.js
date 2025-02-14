import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../ksaforsale-rect-native-test-main/config/firebase"; // Ensure Firebase is correctly configured
import CategoryFilters from './CategoryFilters';

const AdSection = ({
  title = "Featured Ads",
  categories = [],
  onViewAllPress,
  showCategories = true,
  onAdPress,
  onCategoryChange,
  defaultCategory = ''
}) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Ads from Firestore
  useEffect(() => {
    console.log("Fetching ads from Firestore...");
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "Cars");
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Ads:", adsList);
        setAds(adsList);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Filter ads based on selected category
  const filteredAds = defaultCategory
    ? ads.filter(ad => Array.isArray(ad.categories) && ad.categories.includes(defaultCategory))
    : ads;

  const renderAdCard = (ad, index) => {
    const safeAd = {
      id: ad?.id || Math.random().toString(),
      title: ad?.title || 'Untitled',
      image: ad?.galleryImages?.length > 0 ? { uri: ad.galleryImages[0] } : require('../../assets/advertisement.jpeg'), 
      categories: ad?.categories || [],
      location: ad?.City || 'Location not specified',
      price: ad?.Price ? `$${ad.Price}` : 'Price not specified',
      timeAgo: ad?.createdAt 
        ? formatDistanceToNow(ad.createdAt.toDate(), { addSuffix: true }) 
        : "Time not available",
    };

    return (
      <View key={safeAd.id} style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.adCard}
          onPress={() => onAdPress && onAdPress(safeAd)}
        >
          <View style={styles.container}>
            <Image source={safeAd.image} style={styles.adImage} />
            <View style={styles.adContent}>
              <Text style={styles.adTitle} numberOfLines={1}>{safeAd.title}</Text>
              <View style={styles.categoryContainer}>
                {safeAd.categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <Text style={styles.categoryText}>{category}</Text>
                    {index < safeAd.categories.length - 1 && (
                      <Text style={styles.categorySeparator}>|</Text>
                    )}
                  </React.Fragment>
                ))}
              </View>
              <Text style={styles.location}>{safeAd.location}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>{safeAd.price}</Text>
                <Text style={styles.time}>{safeAd.timeAgo}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onViewAllPress && (
          <TouchableOpacity
            onPress={onViewAllPress}
            style={styles.viewAllButton}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {showCategories && (
        <CategoryFilters
          categories={categories}
          onCategoryChange={onCategoryChange}
          defaultCategory={defaultCategory}
        />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {loading ? (
          <Text>Loading ads...</Text>
        ) : filteredAds.length > 0 ? (
          filteredAds.map((ad, index) => (
            <View key={`${ad.id}-${index}`} style={styles.cardWrapper}>
              {renderAdCard(ad)}
            </View>
          ))
        ) : (
          <Text>No ads found for this category.</Text>
        )}
      </ScrollView>
    </View>
  );
};

// Styles (same as yours)
const styles = { 
  sectionWrapper: { backgroundColor: '#E9EEFF', paddingVertical: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'VIPRAVYBOLD' },
  viewAllButton: { backgroundColor: '#2D4495', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  viewAllText: { color: 'white', fontSize: 12, fontWeight: '500' },
  container: { width: 180, height: 200, backgroundColor: 'white', borderRadius: 8, elevation: 3 },
  adCard: { width: 160, height: 220, position: 'relative', marginRight: 16 },
  cardWrapper: { marginRight: 16 },
  adImage: { width: 180, height: 106, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  adContent: { padding: 8 },
  adTitle: { fontSize: 12, fontWeight: '700', color: '#000000', fontFamily: 'Inter', marginBottom: 4 },
  categoryContainer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  categoryText: { fontSize: 10, fontWeight: '400', color: '#000000', fontFamily: 'VIP Rawy Regular' },
  categorySeparator: { marginHorizontal: 4, fontSize: 10, color: '#000000' },
  location: { fontSize: 10, fontWeight: '400', color: '#000000', fontFamily: 'VIP Rawy Regular', marginTop: 4 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 14, fontWeight: '700', color: '#2D4495', fontFamily: 'Inter' },
  time: { fontSize: 10, fontWeight: '400', color: '#000000', fontFamily: 'Inter' },
};

export default AdSection;
