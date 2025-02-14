import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { theme } from './theme';
import { SAMPLE_ADS } from './constants/sampleAds';
import { Ionicons } from '@expo/vector-icons';
import { useStatusBarColor } from './hooks/statusbar';

const MyAdds = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState('active');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <ScrollView style={styles.content}>
            {SAMPLE_ADS.map((ad) => (
              <TouchableOpacity
                key={ad.id}
                style={styles.adCard}
                onPress={() => navigation.navigate('AdDetailScreen', { ad })}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../assets/automotive_ad.png')}
                    style={styles.adImage}
                  />
                  <View style={styles.imageCount}>
                    <Ionicons name="camera" size={12} color={theme.colors.secondary.white} />
                    <Text style={styles.imageCountText}>{ad.imageCount}</Text>
                  </View>
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
          </ScrollView>
        );
      case 'pending':
        return (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No Pending Ads</Text>
            <Text style={styles.promptText}>You haven't posted anything yet. Would you like to sell something?</Text>
          </View>
        );
      case 'removed':
        return (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No Removed Ads</Text>
            <Text style={styles.promptText}>You haven't posted anything yet. Would you like to sell something?</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.primary1} />
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondary.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text
          style={[styles.tabText, activeTab === 'active' ? styles.activeTab : null]}
          onPress={() => setActiveTab('active')}
        >
          Active (0)
        </Text>
        <Text
          style={[styles.tabText, activeTab === 'pending' ? styles.activeTab : null]}
          onPress={() => setActiveTab('pending')}
        >
          Pending (0)
        </Text>
        <Text
          style={[styles.tabText, activeTab === 'removed' ? styles.activeTab : null]}
          onPress={() => setActiveTab('removed')}
        >
          Removed (0)
        </Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  appBarTitle: {
    color: theme.colors.secondary.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabsContainer: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  tabText: {
    color: '#7F8C8D',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#2C3E50',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promptText: {
    color: '#7F8C8D',
    fontSize: 16,
    textAlign: 'center',
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
    certificationIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
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
    ratingMax: {
      color: theme.colors.secondary.black,
    },
});

export default MyAdds;
