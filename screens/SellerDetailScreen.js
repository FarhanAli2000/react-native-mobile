import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';
import { SAMPLE_ADS } from './constants/sampleAds';

const SellerDetailScreen = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderAdCard = ({ item }) => (
    <TouchableOpacity
      style={styles.adCard}
      onPress={() => navigation.navigate('AdDetailScreen', { ad: item })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/advertisement.jpeg')}
          style={styles.adImage}
        />
        <View style={styles.imageCount}>
          <Text style={styles.imageCountText}>14</Text>
        </View>
        <View style={styles.featuredTag}>
          <Ionicons name="star" size={16} color={theme.colors.secondary.white} />
        </View>
        {item.isNew && (
          <View style={styles.newTag}>
            <Text style={styles.newTagText}>new</Text>
          </View>
        )}
      </View>
      <View style={styles.adDetails}>
        <Text style={styles.adTitle}>{item.title}</Text>
        <Text style={styles.adPrice}>PKR {item.price}</Text>
        <View style={styles.adSpecs}>
          <View style={styles.specItem}>
            <Text style={styles.specText}>{item.year}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specText}>{item.mileage}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.certificationContainer}>
          <View style={styles.managedBy}>
            <Ionicons name="shield-checkmark" size={16} color={theme.colors.primary.primary1} />
            <Text style={styles.certificationText}>MANAGED BY PAKWHEELS</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary.primary2} />
            <Text style={styles.ratingText}>CERTIFIED {item.rating}/10</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary.primary1}
        barStyle="light-content"
      />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name="chevron-back" 
            size={28} 
            color={theme.colors.secondary.white} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Seller Info */}
        <View style={styles.sellerInfo}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.sellerLogo}
          />
          <Text style={styles.sellerName}>Name of Seller</Text>
          <Text style={styles.sellerLocation}>Address/City of Seller</Text>
          <Text style={styles.memberSince}>Feb 24, 2022</Text>

          <View style={styles.contactButtons}>
            <View style={styles.verifiedContainer}>
              <Ionicons name="phone-portrait" size={20} color={theme.colors.primary.primary1} />
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={theme.colors.primary.primary2}
                style={styles.verifiedBadge}
              />
            </View>
            <View style={styles.verifiedContainer}>
              <Ionicons name="mail" size={20} color={theme.colors.primary.primary1} />
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={theme.colors.primary.primary2}
                style={styles.verifiedBadge}
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="logo-facebook" size={20} color={theme.colors.primary.primary1} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressItem}>
            <Ionicons name="location" size={20} color={theme.colors.primary.primary1} />
            <Text style={styles.addressText}>
              Office # 20, 2nd Floor, I-8 Markaz, Islamabad{'\n'}(Near Meezan Bank)
            </Text>
          </View>
          <View style={styles.addressItem}>
            <Ionicons name="time" size={20} color={theme.colors.primary.primary1} />
            <Text style={styles.addressText}>09:00 AM to 09:00 PM</Text>
          </View>
        </View>

        <View style={styles.postedAdsSection}>
          <Text style={styles.sectionTitle}>Ads Posted By Name of Seller</Text>
          {SAMPLE_ADS.map((ad) => (
            <TouchableOpacity
              key={ad.id}
              style={styles.adCard}
              onPress={() => navigation.navigate('AdDetailScreen', { ad })}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/car1.jpeg')}
                  style={styles.adImage}
                />
                <View style={styles.imageCount}>
                  <Ionicons name="camera" size={12} color={theme.colors.secondary.white} />
                  <Text style={styles.imageCountText}>{ad.imageCount}</Text>
                </View>
                {ad.isFeatured && (
                  <View style={styles.featuredTag}>
                    <Ionicons name="star" size={16} color={theme.colors.secondary.white} />
                  </View>
                )}
                {ad.isNew && (
                  <View style={styles.newTag}>
                    <Text style={styles.newTagText}>new</Text>
                  </View>
                )}
              </View>

              <View style={styles.adDetails}>
                <Text style={styles.adTitle}>{ad.title}</Text>
                <Text style={styles.adPrice}>PKR {ad.price}</Text>

                <View style={styles.adSpecs}>
                  <View style={styles.specItem}>
                    <Text style={styles.specText}>{ad.year}</Text>
                  </View>
                  <View style={styles.specDot} />
                  <View style={styles.specItem}>
                    <Text style={styles.specText}>{ad.mileage}</Text>
                  </View>
                  <View style={styles.specDot} />
                  <View style={styles.specItem}>
                    <Text style={styles.specText}>{ad.fuelType}</Text>
                  </View>
                  <View style={styles.specDot} />
                  <View style={styles.specItem}>
                    <Text style={styles.specText}>{ad.location}</Text>
                  </View>
                </View>
              </View>
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
    backgroundColor: theme.colors.secondary.white,
  },
  header: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: 40,
    height: 100,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    flex: 1,
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'center',
    marginHorizontal: theme.spacing.md,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  sellerInfo: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.secondary.white,
  },
  sellerLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: theme.spacing.md,
    borderRadius: 100,
  },
  sellerName: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  sellerLocation: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  memberSince: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.md,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  verifiedContainer: {
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.round,
  },
  addressSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.dark,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  addressText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    flex: 1,
  },
  postedAdsSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.lg,
  },
  adCard: {
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.background.dark,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  adImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCount: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    gap: 4,
  },
  imageCountText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.small,
  },
  featuredTag: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.secondary.secondary1,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
  },
  newTag: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.primary.primary2,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
  },
  newTagText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.small,
    textTransform: 'uppercase',
  },
  adDetails: {
    padding: theme.spacing.md,
  },
  adTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  adPrice: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.sm,
  },
  adSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.secondary.black,
  },
  specDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.secondary.black,
    marginHorizontal: theme.spacing.xs,
  },
  certificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.dark,
    paddingTop: theme.spacing.sm,
  },
  managedBy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  certificationText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.primary.primary1,
    fontFamily: theme.typography.fontFamily.bold,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.primary.primary2,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default SellerDetailScreen;