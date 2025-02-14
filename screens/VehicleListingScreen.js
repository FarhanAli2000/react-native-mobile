import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, colors } from './theme';

const VehicleListingScreen = () => {
  // State management
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const db = getFirestore();

  // Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVehicles();
    setRefreshing(false);
  };

  // Main function to fetch vehicle data from Firestore
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const adsRef = collection(db, 'ads');
      const vehicleQuery = query(adsRef, where('category', '==', 'vehicles'));
      const querySnapshot = await getDocs(vehicleQuery);

      const vehicleList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setVehicles(vehicleList);
      setError(null);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Failed to load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AdDetailScreen', { adId: item.id })}
      activeOpacity={0.7}
    >
      {/* Vehicle Image */}
      {item.images && item.images.length > 0 ? (
        <Image
          source={{ uri: item.images[0] }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <MaterialIcons name="directions-car" size={40} color={colors.primary.primary2} />
        </View>
      )}

      {/* Card Content Section */}
      <View style={styles.cardContent}>
        {/* Title and Price Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.price}>Rs. {item.price?.toLocaleString() || 'N/A'}</Text>
        </View>

        {/* Location Information */}
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={16} color={colors.primary.primary2} />
          <Text style={styles.location}>{item.city || 'Location N/A'}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description || 'No description available'}
        </Text>

        {/* Footer with Date and Arrow */}
        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="access-time" size={16} color={colors.primary.primary2} />
            <Text style={styles.date}>
              {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Date N/A'}
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color={colors.primary.primary1} />
        </View>
      </View>
    </TouchableOpacity>
  );

  // Loading State View
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary.primary1} />
      </View>
    );
  }

  // Error State View
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchVehicles}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main Render
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary.primary1} barStyle="light-content" />
      <View style={styles.container}>
        {/* Header Section with Back Button */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.secondary.white} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Available Vehicles</Text>
              <Text style={styles.headerSubtitle}>{vehicles.length} listings found</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        {vehicles.length === 0 ? (
          <View style={styles.centered}>
            <MaterialIcons name="local-car-wash" size={48} color={colors.primary.primary2} />
            <Text style={styles.noDataText}>No vehicles available</Text>
          </View>
        ) : (
          <FlatList
            data={vehicles}
            renderItem={renderVehicleCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={[colors.primary.primary1]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.primary1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.primary.primary1,
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: theme.spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.xlarge,
    color: colors.secondary.white,
    fontFamily: theme.typography.fontFamily.bold,
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.small,
    color: colors.secondary.white,
    marginTop: theme.spacing.xs,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    elevation: 3,
    shadowColor: colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    width: '100%',
    backgroundColor: colors.background.dark,
  },
  placeholderImage: {
    height: 200,
    width: '100%',
    backgroundColor: colors.background.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: colors.primary.primary1,
    marginRight: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.sizes.medium,
    color: colors.primary.primary2,
    fontFamily: theme.typography.fontFamily.bold,
    backgroundColor: 'rgba(54, 166, 128, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  location: {
    fontSize: theme.typography.sizes.small,
    color: colors.secondary.black,
    marginLeft: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.sizes.medium,
    color: colors.secondary.black,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: theme.typography.sizes.small,
    color: colors.secondary.black,
    marginLeft: theme.spacing.xs,
  },
  errorText: {
    fontSize: theme.typography.sizes.medium,
    color: 'red',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary.primary1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  retryText: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
  noDataText: {
    fontSize: theme.typography.sizes.medium,
    color: colors.secondary.black,
    marginTop: theme.spacing.md,
  },
});

export default VehicleListingScreen;