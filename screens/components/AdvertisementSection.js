import React, { useCallback } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { colors, theme } from '../theme';

const AdvertisementSection = React.memo(({ title, CommercialAds, onViewAllPress }) => {
  const renderAdCard = useCallback(
    ({ item: advertisement }) => (
      <TouchableOpacity key={advertisement.id} style={styles.advertisementCard}>
        <Image source={{ uri: advertisement.img }} style={styles.advertisementImage} />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onViewAllPress && (
          <TouchableOpacity
            onPress={onViewAllPress}
            style={styles.viewAllButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.viewAllText, { opacity: 1 }]}>View All Ads</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={CommercialAds}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAdCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.adsContainer}
      />
    </>
  );
});

const styles = StyleSheet.create({
  advertisementCard: {
    width: 250,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 10,
  },
  advertisementImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  viewAllButton: {
    backgroundColor: theme.colors.primary.primary1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewAllText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  adsContainer: {
    paddingLeft: 15,
  },
});

export default AdvertisementSection;
