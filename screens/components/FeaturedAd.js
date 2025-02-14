import React from 'react';
import { ScrollView, Text, TouchableOpacity, Image, View } from 'react-native';
import { Camera } from "lucide-react-native"; 
import CategoryFilters from './CategoryFilters';
import { theme } from '../theme';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../ksaforsale-rect-native-test-main/config/firebase"; // Ensure Firebase is correctly configured
const FeaturedAdSection = ({ 
    title = "Featured Ads",
    ads = [],
    categories = [], 
    onViewAllPress,
    showCategories = true,
    onAdPress,
    onCategoryChange,
    defaultCategory = ''
  }) => {
    const renderAdCard = (ad) => {
      const safeAd = {
        id: ad?.id || Math.random().toString(),
        title: ad?.title || 'Untitled',
        image: ad?.img || require('../../assets/advertisement.jpeg'),
        categories: ad?.categories || [],
        location: ad?.location || 'Location not specified',
        price: ad?.price || 'Price not specified',
        timeAgo: ad?.timeAgo || '',
        imageCount: ad?.imageCount || 0,
        isFeatured: ad?.isFeatured || false,
      };
  console.log(safeAd.title,"safeAd title occur");
      return (
        <View key={safeAd.id} style={styles.cardWrapper}>
          <TouchableOpacity 
            style={styles.adCard}
            onPress={() => onAdPress && onAdPress(safeAd)}
          >
            <View style={styles.container}>
              {/* Rest of the card content remains the same */}
              <Image source={{uri:safeAd.image}} style={styles.adImage} />
              {safeAd.isFeatured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>Featured</Text>
                </View>
              )}
              {safeAd.imageCount > 0 && (
                <View style={styles.imageCount}>
                  <Camera size={10} color="white" />
                  <Text style={styles.imageCountText}>{safeAd.imageCount}</Text>
                </View>
              )}
              
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
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {onViewAllPress && (
            <TouchableOpacity onPress={onViewAllPress}>
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
          {Array.isArray(ads) && ads.map(renderAdCard)}
        </ScrollView>
      </View>
    );
  };
  const styles = {
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 12,
      marginTop:12
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000000',
      fontFamily: 'Inter',
    },
    viewAllText: {
      fontSize: 14,
      color:  theme.colors.primary.primary1,
      fontFamily: 'Inter',
    },
    container: {
      width: 180,
      height: 200,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    adCard: {
      width: 160,
      height: 220,
      position: 'relative',
      marginRight:16
     
    },
  
    cardWrapper: {
      marginRight: 16,  
    },
    
    adImage: {
      width: 180,
      height: 106,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    featuredBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      width: 50,
      height: 16,
      borderTopLeftRadius: 4,
      backgroundColor: '#36A680',
      justifyContent: 'center',
      alignItems: 'center',
    },
    featuredText: {
      color: 'white',
      fontSize: 10,
    },
    imageCount: {
      position: 'absolute',
      top: 82,
      left: 8,
      width: 32,
      height: 16,
      backgroundColor: '#36A680',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      flexDirection: 'row', 
      gap: 4,
    },
    imageCountText: {
      color: 'white',
      fontSize: 10,
    },
    adContent: {
      padding: 8,
    },
    adTitle: {
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 16,
      color: '#000000',
      fontFamily: 'Inter',
      marginBottom: 4,
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    categoryText: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
      color: '#000000',
      fontFamily: 'VIP Rawy Regular',
    },
    categorySeparator: {
      marginHorizontal: 4,
      fontSize: 10,
      color: '#000000',
    },
    location: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
      color: '#000000',
      fontFamily: 'VIP Rawy Regular',
      marginTop: 4,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    price: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 16,
      color:  theme.colors.primary.primary1,
      fontFamily: 'Inter',
    },
    time: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 12,
      color: '#000000',
      fontFamily: 'Inter',
    },
  };
  
export default FeaturedAdSection;